/// <reference types="node" />
import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/db';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const uploadDir = 'static/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const resourceSchema = z.object({
  title: z.string().max(200),
  description: z.string().max(1000),
  category: z.string(),
  language: z.string(),
  provider: z.string(),
  roles: z.string(),
  uploadedBy: z.string().default('Anonymous'),
});

export const prerender = false;

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const fields = Object.fromEntries(formData.entries());
  const parse = resourceSchema.safeParse(fields);
  if (!parse.success || !file) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
  }
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  const r2 = new S3Client({
    region: process.env.R2_REGION,
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
    }
  });

  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: fileName,
    Body: Buffer.from(arrayBuffer),
    ContentType: file.type
  }));

  const fileUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

  const resource = await prisma.resource.create({
    data: {
      ...parse.data,
      filePath: fileUrl,
      fileType: file.type,
    },
  });
  return new Response(JSON.stringify(resource), { status: 201 });
};

export const GET: RequestHandler = async () => {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });
  return new Response(JSON.stringify(resources));
}; 