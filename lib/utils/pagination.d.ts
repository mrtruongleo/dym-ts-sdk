import { ExchangePagination, PaginationOption } from '../types/pagination';
import { Pagination, PagePagination } from '../types/pagination';
import { CosmosBaseQueryV1Beta1Pagination } from '@injectivelabs/core-proto-ts';
import { InjectiveExplorerRpc } from '@injectivelabs/indexer-proto-ts';
export declare const paginationRequestFromPagination: (pagination?: PaginationOption) => CosmosBaseQueryV1Beta1Pagination.PageRequest | undefined;
export declare const generatePagination: (pagination: Pagination | PagePagination | undefined) => {
    pagination: {
        key: string;
    };
} | undefined;
export declare const paginationUint8ArrayToString: (key: any) => string;
export declare const pageResponseToPagination: ({ newPagination, oldPagination, }: {
    oldPagination: PagePagination | undefined;
    newPagination?: Pagination | undefined;
}) => PagePagination;
export declare const grpcPaginationToPagination: (pagination: CosmosBaseQueryV1Beta1Pagination.PageResponse | undefined) => Pagination;
export declare const grpcPagingToPaging: (pagination: InjectiveExplorerRpc.Paging | undefined) => ExchangePagination;
export declare const fetchAllWithPagination: <T extends PaginationOption | {
    pagination: PaginationOption | undefined;
} | undefined, Q extends {
    pagination: Pagination;
}>(args: T, method: (args: T) => Promise<Q>) => Promise<Q>;
