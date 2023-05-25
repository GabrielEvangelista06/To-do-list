const setTagAsDone = async (element, id) => {
  event.preventDefault();

  try {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ task: { done: element.checked } });
    const response = await fetch(`/tasks/${id}?method=put`, {
      headers,
      body,
      method: 'put',
    });
    const data = await response.json();
    const task = data.task;
    const parent = element.parentNode;

    if (task.done) {
      element.checked = true;
      parent.classList.add('has-text-success');
      parent.classList.add('is-italic');
    } else {
      element.checked = false;
      parent.classList.remove('has-text-success');
      parent.classList.remove('is-italic');
    }
  } catch (err) {
    alert('Erro ao atualizar a tarefa');
  }
};
