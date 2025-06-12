
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import SearchFilters from "./SearchFilters";

interface SearchBoxProps {
  onSearch: (query: string, filters: any) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    fileType: "",
    dateRange: { from: "", to: "" }
  });

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, filters);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 animate-fade-in">
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-wine-pale shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar documentos administrativos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-4 py-3 text-lg border-wine-pale focus:ring-primary focus:border-primary"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="p-3 border-wine-pale hover:bg-wine-pale"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleSearch}
              className="px-8 py-3 bg-primary hover:bg-wine-medium transition-colors duration-200"
              disabled={!query.trim()}
            >
              Buscar
            </Button>
          </div>

          {showFilters && (
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default SearchBox;
