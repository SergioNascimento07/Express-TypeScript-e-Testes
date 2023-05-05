//o entityManager retorna uma chamada de funcao assincrona

import { EntityManager } from "typeorm";

interface mockManagerArgs {
    saveReturn?: object | [object] ,
    findOneReturn?: object
}

//retorna promise
export const getMockEntityManager = async ({
    saveReturn = undefined,
    findOneReturn = undefined
}: mockManagerArgs):Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {}

    //mockImplementation p informar qual retorno esperado
    //uma promise ja resolvida
    manager.save = jest.fn().mockImplementation(()=> Promise.resolve(saveReturn))
    manager.findOne = jest.fn().mockImplementation(()=> {
        Promise.resolve(findOneReturn)
    })


    return manager as EntityManager
}