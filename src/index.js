import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
    const url = new URL(event.request.url);
    
    // Serve the configuration for CORS proxy
    if (url.pathname === '/config') {
        const corsProxy = CORS_PROXY;
        const response = { corsproxy: corsProxy };
        return new Response(JSON.stringify(response), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const response = await getAssetFromKV(event);
        return new Response(response.body, response);
    } catch (e) {
        return new Response('404 Not Found', { status: 404 });
    }
}
