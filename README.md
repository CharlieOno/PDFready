# PDFready

Microservice implementation to create PDF files from :
 - rawhtml
 - page html
 - template

# Usage

## Dev build

```shell
yarn install
yarn run dev
```

## Production build

```shell
yarn run build
yarn run start
```

# Endpoints

## Raw HTML to PDF
POST `/pdfready/rawhtml/to/pdf`

Body parameters >
 - `content` as string

Exemple >

```JSON
{
	"content" : "<h1>Welcome</h1><p>PDFready</p>"
}
```

Reponse > 

Raw PDF content

---

## Page HTML to PDF

POST `/pdfready/pagehtml/to/pdf`

Body parameters >
 - `content` as string

Exemple >

```JSON
{
	"content" : "http://www.google.com"
}
```

Response >

Raw PDF content

---

## Template to PDF

POST `/pdfready/template/to/pdf`

Body parameters >
 - `content` as string
 - `data` as object

Exemple >

```JSON
{
	"content" : "invoice",
	"data" : {
		"name" : "pdfready user"
	}
}
```

Response >

Raw PDF content

---

## Render template

GET `/pdfready/template`

Body parameters >
 - `content` as string
 - `data` as object

Exemple >

```JSON
{
	"content" : "invoice",
	"data" : {
		"name" : "pdfready user"
	}
}
```

Response >

HTML content