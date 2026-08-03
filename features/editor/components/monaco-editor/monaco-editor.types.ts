export interface MonacoEditorProps {
  tabId: string;
  path: string;
  language: string;
  value: string;
  readOnly?: boolean;
  onChange?: (value: string | undefined) => void;
}
