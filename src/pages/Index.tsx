
import { useState } from "react";
import SearchHeader from "@/components/SearchHeader";
import SearchBox from "@/components/SearchBox";
import SearchResults from "@/components/SearchResults";
import DocumentUpload from "@/components/DocumentUpload";

// Datos de ejemplo para simular resultados de búsqueda
const mockDocuments = [
  {
    id: "1",
    title: "Reglamento Académico 2024",
    type: "docx",
    size: "2.3 MB",
    lastModified: "15 de marzo, 2024",
    content: "Reglamento académico actualizado para el año lectivo 2024, incluyendo nuevas disposiciones para estudiantes de ingeniería de sistemas...",
    url: "/documents/reglamento-academico-2024.docx"
  },
  {
    id: "2",
    title: "Registro de Calificaciones Primer Semestre",
    type: "xlsx",
    size: "1.8 MB",
    lastModified: "22 de febrero, 2024",
    content: "Registro completo de calificaciones de estudiantes del primer semestre, incluyendo notas parciales y finales...",
    url: "/documents/calificaciones-primer-semestre.xlsx"
  },
  {
    id: "3",
    title: "Procedimientos de Inscripción",
    type: "txt",
    size: "456 KB",
    lastModified: "8 de enero, 2024",
    content: "Guía detallada de los procedimientos para inscripción de materias, requisitos y fechas importantes...",
    url: "/documents/procedimientos-inscripcion.txt"
  },
  {
    id: "4",
    title: "Plan de Estudios Ingeniería de Software",
    type: "docx",
    size: "3.1 MB",
    lastModified: "12 de diciembre, 2023",
    content: "Plan de estudios actualizado para la carrera de Ingeniería de Software, incluyendo materias electivas y pre-requisitos...",
    url: "/documents/plan-estudios-software.docx"
  }
];

const Index = () => {
  const [searchResults, setSearchResults] = useState<typeof mockDocuments>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleSearch = async (query: string, filters: any) => {
    setIsLoading(true);
    setSearchQuery(query);

    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filtrar documentos mock basado en la consulta
    let filteredResults = mockDocuments.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.content.toLowerCase().includes(query.toLowerCase())
    );

    // Aplicar filtros de tipo de archivo
    if (filters.fileType) {
      filteredResults = filteredResults.filter(doc => doc.type === filters.fileType);
    }

    setSearchResults(filteredResults);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-wine-pale/10 to-wine-pale/20">
      <SearchHeader onUploadClick={() => setShowUpload(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Motor de Búsqueda
              <span className="block text-wine-medium">Documentos Académicos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentra rápidamente documentos administrativos de la Facultad de Ingeniería de Sistemas, Software e Industrial
            </p>
          </div>

          {/* Search Box */}
          <SearchBox onSearch={handleSearch} />

          {/* Search Results */}
          {(searchQuery || isLoading) && (
            <SearchResults 
              results={searchResults}
              query={searchQuery}
              isLoading={isLoading}
            />
          )}

          {/* Welcome Section when no search */}
          {!searchQuery && !isLoading && (
            <div className="text-center py-16 space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-wine-medium rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-white">FIS</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-primary">
                  Bienvenido al Sistema de Búsqueda
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Utiliza la barra de búsqueda para encontrar documentos administrativos, 
                  reglamentos, registros y más información académica.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                <div className="p-6 bg-white rounded-lg shadow-sm border border-wine-pale">
                  <div className="w-12 h-12 bg-wine-pale rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">📄</span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Documentos Word</h3>
                  <p className="text-sm text-muted-foreground">
                    Reglamentos, procedimientos y documentos oficiales
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-sm border border-wine-pale">
                  <div className="w-12 h-12 bg-wine-pale rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">📊</span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Hojas de Cálculo</h3>
                  <p className="text-sm text-muted-foreground">
                    Registros de calificaciones, horarios y datos académicos
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-sm border border-wine-pale">
                  <div className="w-12 h-12 bg-wine-pale rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">📝</span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Archivos de Texto</h3>
                  <p className="text-sm text-muted-foreground">
                    Guías, instrucciones y documentación técnica
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <DocumentUpload 
        isOpen={showUpload} 
        onClose={() => setShowUpload(false)} 
      />
    </div>
  );
};

export default Index;
