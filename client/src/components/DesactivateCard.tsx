import { Card } from "primereact/card";
import { AutoComplete } from "primereact/autocomplete";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import NavButton from "@/components/NavButton";

interface DesactivateCardProps<T> {
  entityName: string;
  selectedItem: T | null;
  setSelectedItem: (item: T | null) => void;
  suggestions: T[];
  search: (e: any) => void;
  getFullName: (item: T) => string;
  getIdentifier: (item: T) => string;
  placeholder: string;
  onSubmit: () => void;
}

export function DesactivateCard<T>({
  entityName,
  selectedItem,
  setSelectedItem,
  suggestions,
  search,
  getFullName,
  getIdentifier,
  placeholder,
  onSubmit
}: DesactivateCardProps<T>) {
  return (
    <Card style={{ background: '#f1faee', width: '100%' }}>

      <AutoComplete
        value={selectedItem}
        suggestions={suggestions}
        completeMethod={search}
        field={getIdentifier as any}
        onChange={(e) => setSelectedItem(e.value)}
        placeholder={placeholder}
        dropdown
        className="w-full"
      />

      <Divider />

      <form
        className="grid gap-2 items-center"
        style={{ gridTemplateColumns: '35% 65%' }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {selectedItem ? (
          <>
            <label className="font-bold text-cyan-700 capitalize">
              {entityName}:
            </label>

            <InputText
              value={getFullName(selectedItem)}
              readOnly
            />

            <div className="col-span-2 flex justify-end">
              <NavButton
                type="submit"
                label="Inactivar"
                btnFunction={() => {}}
              />
            </div>
          </>
        ) : (
            <div className="col-span-2 flex text-center align-items-center justify-content-center bg-[#f1faee] p-5 border-round"> 
                <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i> 
                <h3>Seleccione un {entityName}</h3>
            </div>
        )}
      </form>
    </Card>
  );
}