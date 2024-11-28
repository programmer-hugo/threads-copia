import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

import firebaseConfig from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');
const newPostSection = document.getElementById('new-post');

loginBtn.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => console.log(`Bienvenido ${result.user.displayName}`))
        .catch(error => console.error('Error al iniciar sesión:', error));
});

logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => console.log('Sesión cerrada.'));
});

auth.onAuthStateChanged(user => {
    if (user) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        newPostSection.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        newPostSection.style.display = 'none';
    }
});

const publishBtn = document.getElementById('publish');
const postContent = document.getElementById('post-content');

publishBtn.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (content) {
        addDoc(collection(db, 'posts'), {
            content,
            user: auth.currentUser.displayName,
            createdAt: new Date().toISOString(),
        }).then(() => {
            postContent.value = '';
            console.log('Publicación guardada.');
        }).catch(error => console.error('Error al guardar publicación:', error));
    }
});

const postsDiv = document.getElementById('posts');

onSnapshot(collection(db, 'posts'), snapshot => {
    postsDiv.innerHTML = ''; // Limpia las publicaciones previas.
    snapshot.docs.forEach(doc => {
        const post = doc.data();
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p><strong>${post.user}</strong>: ${post.content}</p>
            <small>${new Date(post.createdAt).toLocaleString()}</small>
        `;
        postsDiv.appendChild(postElement);
    });
});
