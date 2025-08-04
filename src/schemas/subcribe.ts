export type FileType = {
  id?: bigint,
  filename?: string,
  file_path?: string,
  description?: string,
  description_extend?: string,
  extension?: string,
  file_type?: string,
  size?: number,
  status?: string,
  created_at?: Date,
  updated_at?: Date,
  created_by?: bigint,
  updated_by?: bigint,
  category?: CategoryType | CategoryType[]
}

export type FaqType = {
  id: bigint,
  question: string
  answer: string,
  status?: string,
  position?: number,
  created_at?: Date,
  updated_at?: Date,
  created_by?: bigint,
  updated_by?: bigint,
  category?: CategoryType | CategoryType[]
}

export type DocumentType = {
  id?: bigint,
  description?: string,
  description_extend?: string,
  status?: string,
  created_at?: Date,
  updated_at?: Date,
  created_by?: bigint,
  updated_by?: bigint,
  category?: CategoryType | CategoryType[]
}

export type OcrType = {
  id?: bigint,
  filename?: string,
  file_path?: string,
  description?: string,
  description_extend?: string,
  extension?: string,
  file_type?: string,
  size?: number,
  status?: string,
  created_at?: Date,
  updated_at?: Date,
  created_by?: bigint,
  updated_by?: bigint,
  category?: CategoryType | CategoryType[]
}

export type VoiceType = {
  id?: bigint,
  filename?: string,
  file_path?: string,
  description?: string,
  description_extend?: string,
  extension?: string,
  file_type?: string,
  size?: number,
  status?: string,
  created_at?: Date,
  updated_at?: Date,
  created_by?: bigint,
  updated_by?: bigint,
  category?: CategoryType | CategoryType[]
}

export type CategoryType = {
  id?: number,
  name?: string,
  description?: string,
  parent_id?: number,
  path?: string,
  voices?: VoiceType[],
  files?: FileType[],
  documents?: DocumentType[],
  ocrs?: OcrType[],
  faqs: FaqType[]
}

export type FaqCategoryType = {
  category_id: number,
  faq_id: bigint,
  category?: CategoryType,
  faq?: FaqType
}

export type FileCategoryType = {
  category_id: number,
  file_id: bigint,
  category?: CategoryType,
  file?: FileType | VoiceType | DocumentType | OcrType
}

