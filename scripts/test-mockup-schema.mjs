import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
try {
  // Try creating a mockup row with rotateY to confirm column exists
  const config = await db.configuration.findFirst();
  const scene = await db.scene.findFirst();
  
  if (!config || !scene) {
    console.log('No config or scene rows yet — checking column via raw SQL instead');
    const cols = await db.$queryRaw`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'Mockup' AND column_name IN ('placementRotateY','placementRotateX')
    `;
    console.log('Columns found:', cols);
  } else {
    console.log('Config:', config.id, '| Scene:', scene.id);
    const m = await db.mockup.create({
      data: {
        configurationId: config.id,
        sceneId: scene.id,
        placementX: 0.5,
        placementY: 0.5,
        placementScale: 0.4,
        placementRotateY: 0,
        placementRotateX: 0,
      }
    });
    console.log('Mockup created OK:', m.id, 'rotateY:', m.placementRotateY);
    await db.mockup.delete({ where: { id: m.id } });
    console.log('Cleanup done. Schema is correct!');
  }
} catch(e) {
  console.error('Error:', e.message);
} finally {
  await db.$disconnect();
}
