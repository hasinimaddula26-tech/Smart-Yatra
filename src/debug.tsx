import { createRoot } from 'react-dom/client';

console.log("DEBUG SCRIPT LOADED");

const root = document.getElementById('root');
if (root) {
    root.innerHTML = '<div style="background:red; color:white; padding:50px; font-size: 30px;">I AM ALIVE</div>';
    // Double check with React
    const reactRoot = createRoot(root);
    reactRoot.render(
        <div style={{ background: 'green', color: 'white', padding: '50px', fontSize: '30px', marginTop: '20px' }}>
            React is also alive
        </div>
    );
} else {
    document.body.innerHTML = '<h1>FATAL: No ROOT Div Found</h1>';
}
