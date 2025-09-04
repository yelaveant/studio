import { SettingsForm } from "./components/settings-form";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Configuración SMB</h1>
        <p className="text-muted-foreground">
          Configure los detalles de conexión para acceder a la ruta de archivos compartida.
        </p>
      </div>
      <SettingsForm />
    </div>
  )
}
