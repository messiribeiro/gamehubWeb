

  const api = {
    post: async (url, data) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao fazer login');
      return response.json();
    },
  };

  // Manipular o formulário de login
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Chamada à API de login
      const response = await api.post('https://gamehub-back-706779899193.us-central1.run.app/api/auth/login', { email, password });

      if (response.success) {
        // Salvar ID e Token no localStorage
        const userId = response.data.user.id;
        const token = response.data.token;
        localStorage.setItem('userId', userId);
        localStorage.setItem('jwtToken', token);

        // Redirecionar para a página Home
        window.location.href = '../documentation'; // Ajuste para a rota real da sua Home
      } else {
        alert('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro no login:', error.message);
      alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
  });

  const userId = localStorage.getItem("userId");
  if(userId){
    window.location.href = "../documentation"
  }

