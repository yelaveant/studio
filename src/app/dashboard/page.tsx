import { SearchForm } from "./components/search-form"

export default function SearchPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Búsqueda de Documentos</h1>
        <p className="text-muted-foreground">
          Ingrese los datos para buscar los archivos XML y CDR correspondientes.
        </p>
      </div>
      <SearchForm />
    </div>
  )
}
