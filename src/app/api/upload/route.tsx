import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const runtimeConfig = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = formidable({ multiples: true });

    form.on('fileBegin', (name, file) => {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      fs.mkdirSync(uploadDir, { recursive: true });
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log(fields, files);
      res.status(200).json({ fields, files });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
