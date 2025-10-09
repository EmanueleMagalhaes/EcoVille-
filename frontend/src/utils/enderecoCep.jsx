export async function enderecoCep(cep) {
  if (!cep || cep.length < 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) return null;

    return {
      cep: data.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      estado: data.uf,
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
}
