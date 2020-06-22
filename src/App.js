import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: `Repo ${Date.now()}`,
      url: `https:// ${Date.now()}`,
      techs: ["React", "Node"]
    })
    console.log(data)
    setRepositories([...repositories, data])
  }

  function handleRemoveRepository(id) {
    // Pegar a posição no vetor e rrancar ela na hora de atualizar

    api.delete(`repositories/${id}`).then()

    const results = repositories.filter(repository => repository.id !== id);

    setRepositories(results);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
