//o entityManager retorna uma chamada de funcao assincrona

import { EntityManager } from "typeorm";

interface mockManagerArgs {
    saveReturn?: object | object[] 
}

//retorna promise
export const getMockEntityManager = async ({
    saveReturn = undefined
}: mockManagerArgs):Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {}

    //mockImplementation p informar qual retorno esperado
    //uma promise ja resolvida
    manager.save = jest.fn().mockImplementation(()=> Promise.resolve(saveReturn))

    return manager as EntityManager
}