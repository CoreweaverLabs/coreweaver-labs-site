const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ── ROUTES ──────────────────────────────────────
app.get('/', (req, res) => res.render('index', { page: 'home', title: 'Coreweaver Labs — Decentralized Agentic AI' }));
app.get('/projects', (req, res) => res.render('projects', { page: 'projects', title: 'Projects — Coreweaver Labs' }));
app.get('/stack', (req, res) => res.render('stack', { page: 'stack', title: 'Stack — Coreweaver Labs' }));
app.get('/agent', (req, res) => res.render('agent', { page: 'agent', title: 'Agent — Coreweaver Labs' }));
app.get('/network', (req, res) => res.render('network', { page: 'network', title: 'Network — Coreweaver Labs' }));

// ── 404 ─────────────────────────────────────────
app.use((req, res) => res.status(404).render('index', { page: 'home', title: 'Coreweaver Labs' }));

app.listen(PORT, () => console.log(`Coreweaver Labs → http://localhost:${PORT}`));
