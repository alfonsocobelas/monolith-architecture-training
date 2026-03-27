export type CompanyCreateProps = Omit<CompanyProps, 'createdAt' | 'updatedAt' | 'deletedAt'>

export interface CompanyProps {
  id: string
  name: string
}

export interface CompanyPrimitiveProps {
  id: string
  name: string
}
