// ==================== ESTRUCTURA ÁRBOL ====================
class Node {
    constructor(value) {
        this.value = value;
        this.left  = null;
        this.right = null;
        this.x     = 0;
        this.y     = 0;
        this.isRoot = false;
        this.side   = ''; // 'left' | 'right'
    }
}

class BinaryTree {
    constructor() {
        this.root             = null;
        this.inorderSteps     = 0;
        this.inorderDescSteps = 0;
        this.searchSteps      = 0;
    }

    setRoot(value) {
        if (this.root) return false; // ya existe raíz
        const node = new Node(value);
        node.isRoot = true;
        this.root = node;
        return true;
    }

    insert(value) {
        if (!this.root) return false;
        this._insertRecursive(this.root, value);
        return true;
    }

    _insertRecursive(node, value) {
        if (value < node.value) {
            if (!node.left) {
                const n = new Node(value);
                n.side = 'left';
                node.left = n;
            } else {
                this._insertRecursive(node.left, value);
            }
        } else if (value > node.value) {
            if (!node.right) {
                const n = new Node(value);
                n.side = 'right';
                node.right = n;
            } else {
                this._insertRecursive(node.right, value);
            }
        }
    }

    getPreorder() {
        const r = [];
        this._preorder(this.root, r);
        return r;
    }
    _preorder(node, r) {
        if (!node) return;
        r.push(node.value);
        this._preorder(node.left, r);
        this._preorder(node.right, r);
    }

    getPostorder() {
        const r = [];
        this._postorder(this.root, r);
        return r;
    }
    _postorder(node, r) {
        if (!node) return;
        this._postorder(node.left, r);
        this._postorder(node.right, r);
        r.push(node.value);
    }

    getInorder() {
        const r = [];
        this.inorderSteps = 0;
        this._inorder(this.root, r);
        return r;
    }
    _inorder(node, r) {
        if (!node) return;
        this.inorderSteps++;
        this._inorder(node.left, r);
        r.push(node.value);
        this._inorder(node.right, r);
    }

    getInorderDesc() {
        const r = [];
        this.inorderDescSteps = 0;
        this._inorderDesc(this.root, r);
        return r;
    }
    _inorderDesc(node, r) {
        if (!node) return;
        this.inorderDescSteps++;
        this._inorderDesc(node.right, r);
        r.push(node.value);
        this._inorderDesc(node.left, r);
    }

    search(value) {
        this.searchSteps = 0;
        return this._search(this.root, value);
    }
    _search(node, value) {
        if (!node) return null;
        this.searchSteps++;
        if (value === node.value) return node;
        if (value < node.value)   return this._search(node.left,  value);
        return                           this._search(node.right, value);
    }

    reset() {
        this.root             = null;
        this.inorderSteps     = 0;
        this.inorderDescSteps = 0;
        this.searchSteps      = 0;
    }
}

// ==================== CÓDIGO JAVA (para el modal) ====================
const JAVA_CODE = `import java.util.Scanner;
import weka.core.Instances; // Importación de Weka solicitada

class Nodo {
    int valor;
    Nodo izquierdo;
    Nodo derecho;

    public Nodo(int valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho   = null;
    }
}

class ArbolBinario {
    Nodo raiz;
    int pasosInorden     = 0;
    int pasosInordenDesc = 0;
    int pasosBusqueda    = 0;

    public ArbolBinario() { this.raiz = null; }

    // ── Insertar ──────────────────────────────────
    public void insertar(int valor) {
        raiz = insertarRecursivo(raiz, valor);
    }

    private Nodo insertarRecursivo(Nodo actual, int valor) {
        if (actual == null) return new Nodo(valor);
        if (valor < actual.valor)
            actual.izquierdo = insertarRecursivo(actual.izquierdo, valor);
        else if (valor > actual.valor)
            actual.derecho = insertarRecursivo(actual.derecho, valor);
        return actual;
    }

    // ── Preorden ──────────────────────────────────
    public void preorden() {
        System.out.print("Preorden: ");
        preordenRecursivo(raiz);
        System.out.println();
    }
    private void preordenRecursivo(Nodo nodo) {
        if (nodo != null) {
            System.out.print(nodo.valor + " ");
            preordenRecursivo(nodo.izquierdo);
            preordenRecursivo(nodo.derecho);
        }
    }

    // ── Postorden ─────────────────────────────────
    public void postorden() {
        System.out.print("Postorden: ");
        postordenRecursivo(raiz);
        System.out.println();
    }
    private void postordenRecursivo(Nodo nodo) {
        if (nodo != null) {
            postordenRecursivo(nodo.izquierdo);
            postordenRecursivo(nodo.derecho);
            System.out.print(nodo.valor + " ");
        }
    }

    // ── Inorden Ascendente ────────────────────────
    public void inorden() {
        pasosInorden = 0;
        System.out.print("Inorden (Ascendente): ");
        inordenRecursivo(raiz);
        System.out.println();
    }
    private void inordenRecursivo(Nodo nodo) {
        if (nodo != null) {
            pasosInorden++;
            inordenRecursivo(nodo.izquierdo);
            System.out.print(nodo.valor + " ");
            inordenRecursivo(nodo.derecho);
        }
    }

    // ── Inorden Descendente ───────────────────────
    public void inordenDescendente() {
        pasosInordenDesc = 0;
        System.out.print("Inorden Descendente: ");
        inordenDescendenteRecursivo(raiz);
        System.out.println();
    }
    private void inordenDescendenteRecursivo(Nodo nodo) {
        if (nodo != null) {
            pasosInordenDesc++;
            inordenDescendenteRecursivo(nodo.derecho);
            System.out.print(nodo.valor + " ");
            inordenDescendenteRecursivo(nodo.izquierdo);
        }
    }

    // ── Búsqueda ──────────────────────────────────
    public boolean buscar(int valor) {
        pasosBusqueda = 0;
        return buscarRecursivo(raiz, valor);
    }
    private boolean buscarRecursivo(Nodo actual, int valor) {
        if (actual == null) return false;
        pasosBusqueda++;
        if (valor == actual.valor) return true;
        return valor < actual.valor
            ? buscarRecursivo(actual.izquierdo, valor)
            : buscarRecursivo(actual.derecho,   valor);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArbolBinario arbol = new ArbolBinario();

        System.out.println("=== ÁRBOL BINARIO DE BÚSQUEDA ===");
        System.out.print("Ingrese el 1° NODO (Raíz): ");
        int raizValor = scanner.nextInt();
        arbol.insertar(raizValor);

        System.out.print("¿Cuántos nodos adicionales desea ingresar?: ");
        int n = scanner.nextInt();
        for (int i = 0; i < n; i++) {
            System.out.print("Ingrese nodo " + (i + 2) + ": ");
            arbol.insertar(scanner.nextInt());
        }

        System.out.println("\\n--- ORDENAMIENTOS ---");
        arbol.preorden();
        arbol.postorden();
        arbol.inorden();
        arbol.inordenDescendente();

        System.out.println("\\n--- REPORTES DE ORDENAMIENTO ---");
        System.out.println("Pasos inorden ascendente:  " + arbol.pasosInorden     + " llamadas.");
        System.out.println("Pasos inorden descendente: " + arbol.pasosInordenDesc + " llamadas.");

        System.out.println("\\n--- BÚSQUEDA ---");
        System.out.print("Ingrese el número a buscar: ");
        int buscado = scanner.nextInt();
        boolean encontrado = arbol.buscar(buscado);
        System.out.println(encontrado
            ? "Número " + buscado + " ENCONTRADO."
            : "Número " + buscado + " NO encontrado.");
        System.out.println("Pasos para la búsqueda: " + arbol.pasosBusqueda);

        scanner.close();
    }
}`;

// ==================== ESTADO UI ====================
const tree = new BinaryTree();
let rootSet = false;

// Elementos
const canvas        = document.getElementById('treeVisualization');
const emptyMsg      = document.getElementById('emptyMsg');
const rootValueIn   = document.getElementById('rootValue');
const nodeValueIn   = document.getElementById('nodeValue');
const searchValueIn = document.getElementById('searchValue');
const rootBtn       = document.getElementById('rootBtn');
const insertBtn     = document.getElementById('insertBtn');
const searchBtn     = document.getElementById('searchBtn');
const clearBtn      = document.getElementById('clearBtn');
const showJavaBtn   = document.getElementById('showJavaBtn');
const javaModal     = document.getElementById('javaModal');
const closeModal    = document.getElementById('closeModal');
const javaCodeEl    = document.getElementById('javaCode');
const copyBtn       = document.getElementById('copyBtn');
const rootStatus    = document.getElementById('rootStatus');
const searchResult  = document.getElementById('searchResultBox');

// ── Estado inicial: solo raíz habilitada ──
function syncButtons() {
    rootBtn.disabled   = rootSet;
    rootValueIn.disabled = rootSet;
    insertBtn.disabled = !rootSet;
    nodeValueIn.disabled = !rootSet;
}
syncButtons();

// ── Establecer Raíz ──────────────────────────────
rootBtn.addEventListener('click', () => {
    const val = parseInt(rootValueIn.value);
    if (isNaN(val)) { alert('Ingresa un número válido para la Raíz.'); return; }

    tree.setRoot(val);
    rootSet = true;
    rootValueIn.value = '';

    rootStatus.textContent = '✔ Establecida';
    rootStatus.className   = 'status-tag set';

    syncButtons();
    updateVisualization();
    updateReports();
    nodeValueIn.focus();
});

rootValueIn.addEventListener('keypress', e => { if (e.key === 'Enter') rootBtn.click(); });

// ── Agregar Nodo ─────────────────────────────────
insertBtn.addEventListener('click', () => {
    const val = parseInt(nodeValueIn.value);
    if (isNaN(val)) { alert('Ingresa un número válido para el Nodo.'); return; }

    tree.insert(val);
    nodeValueIn.value = '';
    nodeValueIn.focus();

    updateVisualization();
    updateReports();
});

nodeValueIn.addEventListener('keypress', e => { if (e.key === 'Enter') insertBtn.click(); });

// ── Buscar ───────────────────────────────────────
searchBtn.addEventListener('click', () => {
    const val = parseInt(searchValueIn.value);
    if (isNaN(val)) { alert('Ingresa un número válido para buscar.'); return; }

    searchResult.className   = 'search-result-box';
    searchResult.textContent = '⏳ Buscando...';

    const node = tree.search(val);

    if (node) {
        const uiNode = document.getElementById(`node-${node.value}`);
        if (uiNode) {
            uiNode.classList.add('highlight');
            setTimeout(() => uiNode.classList.remove('highlight'), 2500);
        }
        searchResult.classList.add('success');
        searchResult.innerHTML = `✅ Número <strong>${val}</strong> ENCONTRADO<br>
            <span style="font-size:.85rem;opacity:.8">Pasos: <strong>${tree.searchSteps}</strong></span>`;
    } else {
        searchResult.classList.add('error');
        searchResult.innerHTML = `❌ Número <strong>${val}</strong> NO encontrado<br>
            <span style="font-size:.85rem;opacity:.8">Pasos: <strong>${tree.searchSteps}</strong></span>`;
    }
});

searchValueIn.addEventListener('keypress', e => { if (e.key === 'Enter') searchBtn.click(); });

// ── Eliminar / Resetear todo ──────────────────────
clearBtn.addEventListener('click', () => {
    tree.reset();
    rootSet = false;

    rootStatus.textContent = 'Sin raíz';
    rootStatus.className   = 'status-tag pending';

    syncButtons();
    updateVisualization();
    updateReports();

    searchResult.className   = 'search-result-box';
    searchResult.textContent = 'Realiza una búsqueda para ver el resultado.';

    rootValueIn.focus();
});

// ── Modal: Ver Código Java ────────────────────────
javaCodeEl.textContent = JAVA_CODE;

showJavaBtn.addEventListener('click', () => {
    javaModal.classList.add('open');
});

closeModal.addEventListener('click', () => {
    javaModal.classList.remove('open');
});

javaModal.addEventListener('click', e => {
    if (e.target === javaModal) javaModal.classList.remove('open');
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') javaModal.classList.remove('open');
});

// ── Copiar código ─────────────────────────────────
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(JAVA_CODE).then(() => {
        copyBtn.textContent = '✅ ¡Copiado!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.textContent = '📋 Copiar código';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
});

// ==================== REPORTES ====================
function updateReports() {
    document.getElementById('preorderResult').textContent    = tree.getPreorder().join(' → ')    || '—';
    document.getElementById('postorderResult').textContent   = tree.getPostorder().join(' → ')   || '—';

    const io = tree.getInorder();
    document.getElementById('inorderResult').textContent     = io.join(' → ') || '—';
    document.getElementById('inorderSteps').textContent      = tree.inorderSteps;

    const id = tree.getInorderDesc();
    document.getElementById('inorderDescResult').textContent = id.join(' → ') || '—';
    document.getElementById('inorderDescSteps').textContent  = tree.inorderDescSteps;
}

// ==================== DIBUJADO ====================
function updateVisualization() {
    canvas.querySelectorAll('.tree-node, .tree-line').forEach(n => n.remove());

    if (!tree.root) {
        emptyMsg.style.display = 'block';
        return;
    }
    emptyMsg.style.display = 'none';

    const w = canvas.clientWidth || 700;
    calculatePositions(tree.root, 0, w, 55, 70);
    drawLines(tree.root);
    drawNodes(tree.root);
}

function calculatePositions(node, left, right, y, yLevel) {
    if (!node) return;
    node.x = left + (right - left) / 2;
    node.y = y;
    calculatePositions(node.left,  left,    node.x, y + yLevel, yLevel);
    calculatePositions(node.right, node.x,  right,  y + yLevel, yLevel);
}

function drawLines(node) {
    if (!node) return;
    if (node.left)  { drawLine(node.x, node.y, node.left.x,  node.left.y);  drawLines(node.left);  }
    if (node.right) { drawLine(node.x, node.y, node.right.x, node.right.y); drawLines(node.right); }
}

function drawLine(x1, y1, x2, y2) {
    const len   = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const el    = document.createElement('div');
    el.className      = 'tree-line';
    el.style.width    = `${len}px`;
    el.style.left     = `${x1}px`;
    el.style.top      = `${y1}px`;
    el.style.transform= `rotate(${angle}deg)`;
    canvas.appendChild(el);
}

function drawNodes(node) {
    if (!node) return;
    const el = document.createElement('div');
    el.id          = `node-${node.value}`;
    el.className   = 'tree-node';
    el.textContent = node.value;
    el.style.left  = `${node.x}px`;
    el.style.top   = `${node.y}px`;

    if (node.isRoot)          el.classList.add('root-node');
    else if (node.side === 'left')  el.classList.add('left-node');
    else                            el.classList.add('right-node');

    canvas.appendChild(el);
    drawNodes(node.left);
    drawNodes(node.right);
}

window.addEventListener('resize', updateVisualization);
