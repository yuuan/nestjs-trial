import type { User } from "@prisma/client";
import type { File } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";
import { getClient, ModelWithFields, createScreener, getScalarFieldValueGenerator, Resolver, normalizeResolver, normalizeList, getSequenceCounter, } from "@quramy/prisma-fabbrica/lib/internal";
export { initialize, resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";

type BuildDataOptions = {
    readonly seq: number;
};

const modelFieldDefinitions: ModelWithFields[] = [{
        name: "User",
        fields: [{
                name: "files",
                type: "File",
                relationName: "FileToUser"
            }]
    }, {
        name: "File",
        fields: [{
                name: "author",
                type: "User",
                relationName: "FileToUser"
            }]
    }];

type UserScalarOrEnumFields = {
    name: string;
    email: string;
    password: string;
};

type UserFactoryDefineInput = {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    files?: Prisma.FileCreateNestedManyWithoutAuthorInput;
};

type UserFactoryDefineOptions = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>;
};

export interface UserFactoryInterface {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>;
    createList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Pick<User, "id">>;
}

function autoGenerateUserScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "User", fieldName: "name", isId: false, isUnique: false, seq }),
        email: getScalarFieldValueGenerator().String({ modelName: "User", fieldName: "email", isId: false, isUnique: true, seq }),
        password: getScalarFieldValueGenerator().String({ modelName: "User", fieldName: "password", isId: false, isUnique: false, seq })
    };
}

function defineUserFactoryInternal({ defaultData: defaultDataResolver }: UserFactoryDefineOptions): UserFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("User", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<UserFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data: Prisma.UserCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: User) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().user.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.UserCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "User" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export function defineUserFactory(options: UserFactoryDefineOptions = {}): UserFactoryInterface {
    return defineUserFactoryInternal(options);
}

type FileScalarOrEnumFields = {
    name: string;
    mime: string;
    content: Buffer;
};

type FileauthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutFilesInput["create"]>;
};

type FileFactoryDefineInput = {
    name?: string;
    mime?: string;
    content?: Buffer;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    author?: FileauthorFactory | Prisma.UserCreateNestedOneWithoutFilesInput;
};

type FileFactoryDefineOptions = {
    defaultData?: Resolver<FileFactoryDefineInput, BuildDataOptions>;
};

function isFileauthorFactory(x: FileauthorFactory | Prisma.UserCreateNestedOneWithoutFilesInput | undefined): x is FileauthorFactory {
    return (x as any)?._factoryFor === "User";
}

export interface FileFactoryInterface {
    readonly _factoryFor: "File";
    build(inputData?: Partial<Prisma.FileCreateInput>): PromiseLike<Prisma.FileCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.FileCreateInput>): PromiseLike<Prisma.FileCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.FileCreateInput>[]): PromiseLike<Prisma.FileCreateInput[]>;
    pickForConnect(inputData: File): Pick<File, "id">;
    create(inputData?: Partial<Prisma.FileCreateInput>): PromiseLike<File>;
    createList(inputData: number | readonly Partial<Prisma.FileCreateInput>[]): PromiseLike<File[]>;
    createForConnect(inputData?: Partial<Prisma.FileCreateInput>): PromiseLike<Pick<File, "id">>;
}

function autoGenerateFileScalarsOrEnums({ seq }: {
    readonly seq: number;
}): FileScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "File", fieldName: "name", isId: false, isUnique: false, seq }),
        mime: getScalarFieldValueGenerator().String({ modelName: "File", fieldName: "mime", isId: false, isUnique: false, seq }),
        content: getScalarFieldValueGenerator().Bytes({ modelName: "File", fieldName: "content", isId: false, isUnique: false, seq })
    };
}

function defineFileFactoryInternal({ defaultData: defaultDataResolver }: FileFactoryDefineOptions): FileFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("File", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.FileCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateFileScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<FileFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            author: isFileauthorFactory(defaultData.author) ? {
                create: await defaultData.author.build()
            } : defaultData.author
        };
        const data: Prisma.FileCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.FileCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: File) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.FileCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().file.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.FileCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.FileCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "File" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link File} model.
 *
 * @param options
 * @returns factory {@link FileFactoryInterface}
 */
export function defineFileFactory(options: FileFactoryDefineOptions = {}): FileFactoryInterface {
    return defineFileFactoryInternal(options);
}
