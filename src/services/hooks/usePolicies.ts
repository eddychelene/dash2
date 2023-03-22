import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../apiClient';

export type Policy = {
  id: number,
  reference: string,
  due_date: string,
  is_paid: boolean,
  periodicity: string,
  simple_price: number,
  commission: number,
  emission_date: Date,
  created_at: Date,
  file: {
    id: 1,
    original_name: string,
    url: string,
  },
  insurance_category: {
    id: 1,
    title: string,
    description: string,
  },
  customer: {
    id: number,
    code: string,
    name: string
    email: string,
    contact: number,
    birth_date: Date,
    document_name: string,
    document_number: string,
  }
};

type GetPoliciesResponse = {
  policies: Policy[];
  totalCount: number;
};

export async function getPolicies(page: number, searchQuery?: string): Promise<GetPoliciesResponse>  {
  const response = await api.get('/policies', {
    params: {
      page,
    }
  });

  const data = response.data;
  const totalCount=20;

  const policies: Policy[] = await Promise.all(
    data.map(async policy => {
      return {
        id: policy.id,
        reference: policy.reference,
        due_date: policy.due_date,
        is_paid: policy.is_paid,
        periodicity: policy.periodicity,
        simple_price: policy.simple_price,
        commission: policy.commission,
        emission_date: Date,
        created_at: Date,
        file: {
          id: 1,
          original_name: policy.file.original_name,
          url: policy.file.url,
        },
        insurance_category: {
          id: policy.insurance_category.id,
          title: policy.insurance_category.title,
          description: policy.insurance_category.description,
        },
        customer: {
          id: policy.customer.id,
          code: policy.customer.code,
          name: policy.customer.name,
          email: policy.customer.email,
          contact: policy.customer.contact,
          birth_date: policy.customer.birth_date,
          document_name: policy.customer.document_name,
          document_number: policy.customer.document_number,
        }
      };
    })
  );

  return {
    policies,
    totalCount
  };
}

export function usePolicies(page: number = 1, searchQuery?: string, options?: UseQueryOptions) {
  return useQuery(['messages', [page, searchQuery]], () => getPolicies(page, searchQuery), {
    staleTime: 1000 * 60 * 1,
    ...options
  }) as UseQueryResult<GetPoliciesResponse, unknown> ;
}