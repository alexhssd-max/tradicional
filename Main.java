import java.util.Scanner;
class Nodo {
    int valor;
    Nodo izquierdo;
    Nodo derecho;

    public Nodo(int valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}

class ArbolBinario {
    Nodo raiz;
    int pasosInorden = 0;
    int pasosInordenDesc = 0;
    int pasosBusqueda = 0;

    public ArbolBinario() {
        this.raiz = null;
    }

    public void insertar(int valor) {
        raiz = insertarRecursivo(raiz, valor);
    }

    private Nodo insertarRecursivo(Nodo actual, int valor) {
        if (actual == null) {
            return new Nodo(valor);
        }
        if (valor < actual.valor) {
            actual.izquierdo = insertarRecursivo(actual.izquierdo, valor);
        } else if (valor > actual.valor) {
            actual.derecho = insertarRecursivo(actual.derecho, valor);
        }
        return actual;
    }

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

    public boolean buscar(int valor) {
        pasosBusqueda = 0;
        return buscarRecursivo(raiz, valor);
    }

    private boolean buscarRecursivo(Nodo actual, int valor) {
        if (actual == null) {
            return false;
        }
        pasosBusqueda++;
        if (valor == actual.valor) {
            return true;
        }
        return valor < actual.valor
            ? buscarRecursivo(actual.izquierdo, valor)
            : buscarRecursivo(actual.derecho, valor);
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
            int valor = scanner.nextInt();
            arbol.insertar(valor);
        }

        System.out.println("\n--- ORDENAMIENTOS ---");
        arbol.preorden();
        arbol.postorden();
        arbol.inorden();
        arbol.inordenDescendente();

        System.out.println("\n--- REPORTES DE ORDENAMIENTO ---");
        System.out.println("Pasos en ordenamiento ascendente (Inorden): " + arbol.pasosInorden + " llamadas a nodos.");
        System.out.println("Pasos en ordenamiento descendente: " + arbol.pasosInordenDesc + " llamadas a nodos.");

        System.out.println("\n--- BÚSQUEDA ---");
        System.out.print("Ingrese el número a buscar: ");
        int buscado = scanner.nextInt();

        boolean encontrado = arbol.buscar(buscado);
        if (encontrado) {
            System.out.println("Número " + buscado + " ENCONTRADO.");
        } else {
            System.out.println("Número " + buscado + " NO encontrado.");
        }
        System.out.println("Pasos realizados para la búsqueda: " + arbol.pasosBusqueda);
        
        scanner.close();
    }
}
