# Memory CLI

## Description

This is a command-line interface (CLI) tool to learn everything you want through quizzes. It supports two modes, including multiple-choice and write-response, allowing users to test and enhance their knowledge.

## Features

- Multiple quiz modes: Choose between `multiple-choice` and `write-response` modes.
- Interactive: User-friendly interface for an engaging learning experience.
- Randomized questions: Questions and answer choices are randomly shuffled for diverse quizzes.

## Installation

Clone the repository:

```bash
git clone https://github.com/alexboisseau/memory-cli.git
```

## Navigate to the project directory:

```bash
cd memory-cli
```

## Install dependencies:

```bash
pnpm install
```

## Usage

Run the application:

```bash
pnpm start
```

Follow the prompts to choose a list, quiz mode, and set the number of questions.

## Configuration

Adjust quiz configurations and lists by modifying JSON files in the `lists/` directory.

## Run the app from anywhere in the terminal

- Update the `run-app.example.sh` with your app directory path and rename it `run-app.sh`.
- Make the Script Executable `chmod +x run-app.sh`.
- Create a Symbolic Link `sudo ln -s /path/to/your/app/run-app.sh /usr/local/bin/run-app`
- Run `run-app` from anywhere !

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## Acknowledgments

- Inquirer.js - CLI interactive prompts.
- Chalk - Terminal string styling.
- Zod - TypeScript-first schema declaration and validation.

## Author

Alex Boisseau

## Acknowledgments

Special thanks to anyone whose code was used.
