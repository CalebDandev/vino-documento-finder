
import { useState, useEffect } from "react";
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
    content: "Guía detallada de los procedimientos para inscripción de materias, requisitos y fechas importantes. Los estudiantes deben seguir estos pasos: 1. Verificar prerrequisitos, 2. Consultar horarios disponibles, 3. Realizar la inscripción en línea, 4. Confirmar la inscripción...",
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
  },
  {
    id: "5",
    title: "Manual de Laboratorio de Programación",
    type: "pdf",
    size: "4.2 MB",
    lastModified: "5 de noviembre, 2023",
    content: "Manual completo para las prácticas de laboratorio de programación, incluyendo ejercicios y proyectos...",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "6",
    title: "Horarios de Clases 2024-I",
    type: "xlsx",
    size: "890 KB",
    lastModified: "20 de enero, 2024",
    content: "Horarios completos de todas las materias para el primer semestre del año 2024...",
    url: "/documents/horarios-2024-i.xlsx"
  },
  {
    id: "7",
    title: "Guía de Tesis de Grado",
    type: "pdf",
    size: "1.8 MB",
    lastModified: "3 de octubre, 2023",
    content: "Documento que establece los lineamientos y requisitos para la elaboración y presentación de tesis de grado...",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

const Index = () => {
  const [searchResults, setSearchResults] = useState<typeof mockDocuments>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // Mostrar resultados predeterminados al cargar la página
  useEffect(() => {
    setSearchResults(mockDocuments);
  }, []);

  const handleSearch = async (query: string, filters: any) => {
    setIsLoading(true);
    setSearchQuery(query);

    // Simular llamada a API con delay más corto para búsqueda en tiempo real
    await new Promise(resolve => setTimeout(resolve, 300));

    // Si no hay query, mostrar todos los documentos
    if (!query.trim()) {
      setSearchResults(mockDocuments);
      setIsLoading(false);
      return;
    }

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
          {/* Search Box */}
          <SearchBox onSearch={handleSearch} />

          {/* Search Results - Siempre mostrar */}
          <SearchResults 
            results={searchResults}
            query={searchQuery}
            isLoading={isLoading}
          />
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
