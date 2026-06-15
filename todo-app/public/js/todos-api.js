
export const getTodos = async () => {
    const response = await fetch('/todos');
    if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }
    return await response.json();
};

export const addTodo = async (text) => {
    const response = await fetch('/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({todo: text})
    });
    if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.statusText}`);
    }
    return await response.json();
};