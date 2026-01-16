document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const formTitle = document.getElementById("form-title");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio real (recarregamento da página)

    let isValid = true;

    // Seleciona todos os inputs obrigatórios
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      const wrapper = input.parentElement; // O .input-group
      const value = input.value.trim();

      if (value === "") {
        // Campo vazio: Adiciona classe de erro
        setError(wrapper);
        isValid = false;
      } else {
        // Campo preenchido: Remove classe de erro
        removeError(wrapper);
      }
    });

    // Validação extra simples de email (se preenchido)
    const emailInput = document.getElementById("email");
    if (emailInput.value.trim() !== "") {
      if (!isValidEmail(emailInput.value)) {
        setError(emailInput.parentElement);
        isValid = false;
      }
    }

    if (isValid) {
      // Se tudo estiver correto
      showSuccess();
    }
  });

  // Função para adicionar estilo de erro
  function setError(element) {
    element.classList.add("error");
  }

  // Função para remover estilo de erro
  function removeError(element) {
    element.classList.remove("error");
  }

  // Regex simples para email
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Função para exibir mensagem de sucesso e esconder o formulário
  function showSuccess() {
    form.style.display = "none";
    formTitle.style.display = "none";
    successMessage.classList.remove("hidden");
  }

  // Adiciona listener para remover o erro assim que o usuário começa a digitar
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      removeError(input.parentElement);
    });
  });
});
