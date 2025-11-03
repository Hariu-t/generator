import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CreateComponentRequest {
  componentName: string;
  displayName: string;
  category: string;
  categoryRomanized: string;
  generatedCode: string;
  uniqueId: string;
  sectionId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body: CreateComponentRequest = await req.json();
    const { componentName, generatedCode, displayName, category, categoryRomanized, uniqueId, sectionId } = body;

    // コンポーネントファイル名を生成（PascalCase）
    const componentFileName = componentName
      .split(/[\s-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Component.tsx';

    // プロジェクトのベースパスを取得
    const projectBasePath = '/tmp/cc-agent/59019885/project';
    const componentFilePath = `${projectBasePath}/src/components/Components/${componentFileName}`;

    // 1. コンポーネントファイルを作成
    await Deno.writeTextFile(componentFilePath, generatedCode);
    console.log(`Component file created: ${componentFilePath}`);

    // 2. componentTemplates.tsを更新して新しいコンポーネントを追加
    const templatesFilePath = `${projectBasePath}/src/data/componentTemplates.ts`;
    let templatesContent = await Deno.readTextFile(templatesFilePath);

    // 配列の最後の ]]; を見つけて、その前に新しいエントリを追加
    const newEntry = `  // ${displayName}
  {
    id: '${uniqueId}',
    type: '${categoryRomanized}',
    name: '${displayName}',
    nameRomanized: '${componentName}',
    description: '${displayName}コンポーネント',
    thumbnail: 'https://placehold.jp/400x267.png',
    category: '${category}',
    categoryRomanized: '${categoryRomanized}',
    uniqueId: '${uniqueId}',
    defaultProps: {}
  },
`;

    // ];の前に新しいエントリを挿入
    templatesContent = templatesContent.replace(/\n\];$/, `\n${newEntry}];`);
    await Deno.writeTextFile(templatesFilePath, templatesContent);
    console.log(`Updated componentTemplates.ts`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `コンポーネント「${displayName}」が作成されました`,
        filePath: componentFilePath,
        fileName: componentFileName,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating component:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "コンポーネントの作成に失敗しました",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});