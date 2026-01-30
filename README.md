# 🎬 MoviesGroup

Plataforma web para criação de **grupos de filmes**, onde usuários autenticados podem criar grupos, convidar membros e avaliar filmes juntos.

---

## 🧱 Stack

- **Next.js (App Router)**
- **NextAuth (Auth.js)** – Login com Google
- **Prisma ORM**
- **PostgreSQL**
- **Docker + Docker Compose**
- **Zod** – Validação de dados

---

## 🔐 Autenticação

Autenticação feita com **NextAuth + Prisma Adapter**.

- Login exclusivamente via **Google**
- Sessões persistidas no banco (`strategy: "database"`)
- Prisma usado **somente no backend / server components**

---

## 🗂️ Estrutura de pastas (simplificada)

```
app/
├─ api/
│  ├─ auth/
│  │  └─ [...nextauth]/route.ts
│  └─ groups/
│     └─ route.ts
│
├─ dashboard/
│  └─ page.tsx   (Server Component)
│
├─ groups/
│  ├─ page.tsx
│  └─ [id]/page.tsx
│
lib/
├─ prisma.ts
│
dtos/
├─ create-group-dto.ts
│
prisma/
├─ schema.prisma
└─ migrations/
```

---

## 📡 Rotas da API

### 🔑 Auth

- [x] `POST /api/auth/signin`
- [x] `GET /api/auth/session`
- [x] `GET /api/auth/callback/google`

---

### 👥 Groups

- [x] `POST /api/groups` → Criar grupo
- [x] `GET /api/groups` → Listar grupos do usuário
- [ ] `GET /api/groups/:id` → Detalhes do grupo
- [ ] `POST /api/groups/:id/members` → Adicionar membro
- [ ] `DELETE /api/groups/:id/members/:userId` → Remover membro

---

## 🧬 Modelos principais (Prisma)

### User
- Criado automaticamente ao login com Google
- Relacionado a grupos e sessões

### Group
- Possui dono (`owner`)
- Possui membros (`GroupMember`)

### GroupMember
- Relação N:N entre `User` e `Group`
- Define papel: `owner | member`

---

## 📦 Como rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone <repo-url>
cd moviesgroup
```

---

### 2️⃣ Variáveis de ambiente

Crie um arquivo `.env`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=super-secret-key

GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
NODE_ENV=development
```

---

### 3️⃣ Subir o banco com Docker

```bash
docker-compose up -d
```

> Isso irá subir um PostgreSQL local

---

### 4️⃣ Instalar dependências

```bash
npm install
```

---

### 5️⃣ Rodar migrations do Prisma

```bash
npx prisma migrate dev
```

Para abrir o Prisma Studio:

```bash
npx prisma studio
```

---

### 6️⃣ Rodar o projeto

```bash
npm run dev
```

Acesse: `http://localhost:3000`

---

## 🧠 Boas práticas adotadas

- ✅ Prisma usado **apenas no backend / server**
- ✅ Server Components para páginas protegidas
- ✅ Client Components apenas para interação
- ✅ Validação de dados com **Zod (DTOs)**
- ✅ Autorização baseada na sessão (`getServerSession`)

---

## 🚀 Próximos passos

- [ ] Página de detalhes do grupo
- [ ] Sistema de convites
- [ ] Avaliação de filmes por grupo
- [ ] Permissões (owner vs member)
- [ ] Deploy (Railway / Vercel)

---

## 🧑‍💻 Autor

Desenvolvido por **Wesley Ramos** 🚀
