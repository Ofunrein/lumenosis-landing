import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    // Map filename to actual file
    const fileMap: { [key: string]: string } = {
      'real-estate-automation.json': 'RealEstateLeadGenAutomation.json',
      'n8n-ai-agent-builder.json': 'N8N Workflow Builder.json',
      'apollo-cold-email-automation.json': 'Cold_Email_Live_Build.json',
      'ai-real-estate-video-automation.json': 'yt vid real estate vid gen.blueprint.json'
    };
    
    const actualFilename = fileMap[filename];
    if (!actualFilename) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }
    
    // Read the file from public/downloads
    const filePath = path.join(process.cwd(), 'public', 'downloads', actualFilename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Return the JSON content
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
    
  } catch (error) {
    console.error('Error serving workflow:', error);
    return NextResponse.json({ error: 'Failed to load workflow' }, { status: 500 });
  }
}
