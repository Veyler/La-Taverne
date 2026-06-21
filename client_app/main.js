const { app, BrowserWindow, Menu } = require("electron") // Import de 2 modules : app qui contrôle le cycle de vie de l'application, BrowserWindow qui gère et creer les fenetres, Menu pour la gestion du menu de base electron
const path = require('path')

Menu.setApplicationMenu(null)                            // Supprime le menu pour toute les pages

const createWindow = () => {                             // La fonction createWindow() charge une nouvelle page dans une nouvelle instance de BrowserWindow
    const win = new BrowserWindow({
        width: 600,
        maxWidth: 600,
        minWidth: 600,
        height: 600,
        maxHeight: 600,
        minHeight: 600,
        icon: path.join(__dirname, 'assets/icon.png')
    })

    win.loadFile('pages/login.html')
}

app.whenReady().then(() => {                             // Lance l'application lorsqu'elle est prête
    createWindow()
})