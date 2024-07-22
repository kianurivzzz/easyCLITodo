import { existsSync, readFileSync, writeFileSync } from 'fs';

/**
 * Читает аргументы командной строки.
 */
const args = process.argv;
const currentWorkingDirectory = args[1]?.slice(0, -8) || '';

/**
 * Создает todo.txt файл, если он не существует.
 */
const createTodoFile = () => {
	// Проверить наличие текущего рабочего каталога
	if (!currentWorkingDirectory) {
		console.log('Ошибка: Отсутствует текущий рабочий каталог.');
		return;
	}
	// Проверить существование todo.txt файла
	if (!existsSync(`${currentWorkingDirectory}todo.txt`)) {
		writeFileSync(`${currentWorkingDirectory}todo.txt`, '');
	}
};

/**
 * Список задач в обратном порядке.
 */
const todoList = () => {
	// Получить текущий рабочий каталог
	if (!currentWorkingDirectory) {
		console.log('Ошибка: Потерян текущий рабочий каталог.');
		return;
	}
	let todoData = [];
	try {
		// Читает todo.txt файл
		todoData = readFileSync(`${currentWorkingDirectory}todo.txt`)
			.toString()
			.split('\n')
			.filter(line => line !== '');
	} catch (error) {
		console.log('Ошибка чтения todo.txt:', error.message);
		return;
	}
	// Выводит список задач в обратном порядке
	todoData.forEach((todo, index) =>
		console.log(`${todoData.length - index}. ${todo}`)
	);
};

/**
 * Добавляет задачу в todo.txt
 */
const addTodo = () => {
	// Получить текущий рабочий каталог
	const newTodo = args[3];
	// Проверить наличие текущего рабочего каталога
	if (!currentWorkingDirectory) {
		console.log('Ошибка: Потерян текущий рабочий каталог.');
		return;
	}
	// Проверить существование todo.txt файла
	if (!newTodo) {
		console.log('Ошибка: Не указана задача. Пожалуйста, введите задачу!');
		return;
	}
	let todoData = '';
	try {
		// Прочитать todo.txt файл
		todoData = readFileSync(
			`${currentWorkingDirectory}todo.txt`
		).toString();
	} catch (error) {
		console.log('Ошибка чтения todo.txt:', error.message);
		return;
	}
	// Добавить задачу в todo.txt
	writeFileSync(
		`${currentWorkingDirectory}todo.txt`,
		`${newTodo}\n${todoData}`
	);
	console.log(`Задача "${newTodo}" добавлена в список.`);
};

// Создать todo.txt файл, если он не существует
createTodoFile();

// Получить команду из аргументов командной строки
const command = args[2];
switch (command) {
	case 'add':
		addTodo();
		break;
	case 'ls':
		todoList();
		break;
	case 'help':
		console.log(
			'Список команд:\n\tadd - добавить задачу в список;\n\tls - вывести список задач;\n\thelp - вывести список команд.'
		);
		break;
	// Добавить команду по умолчанию
	default:
		console.log(
			'Ошибка: Команда не распознана. Пожалуйста, введите "help" для получения справки.'
		);
}
