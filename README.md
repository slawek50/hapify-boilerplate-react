# React Dashboard (Hapify Boilerplate)

This boilerplate provides a web & mobile dashboard built with React.

> This boilerplate is meant to be used with Hapify. To get more info about Hapify setup, please refer to https://www.hapify.io/get-started.

## Get Started

### 1. Clone repository

-   **Option 1**: (Not available) Clone and configure this boilerplate using command `hpf new --boilerplate react_dashboard_slawek`.
-   **Option 2**: You can clone this repository and change the project id in file `hapify.json` by running command `hpf use`.

### 2. Generate code

Then you need to generate code from your Hapify project using `hpf generate`.

⚠️ **Important**: For development purpose, generated files are ignored in the `.gitignore`. You should edit this file and remove the last lines before committing.

### 3. API Dependency

This project can be used with one of these back-ends:

-   [`hapijs_tractr`](https://github.com/Tractr/boilerplate-hapijs): NodeJS API built with [HapiJS](https://hapi.dev/).

Please install and start an API before running React Dashboard.
Don't forget to create an admin user (see documentation). Otherwise, you won't be able to connect to the dashboard.

### 4. Start project

Once the API is started, you can run the project:

```bash
npm install
```

```bash
npm run dev
```

## Advanced Integration

This boilerplate includes a user sessions management.
