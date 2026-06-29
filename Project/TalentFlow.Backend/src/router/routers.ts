import { Express } from 'express'
import express from 'express'
import aprendiz from './Aprendiz.ts'
import instrutor from './instrutor.ts'
import turma from './Turma.ts'
import auth from './auth.ts'

export default function (app: Express) {
    app
       .use(express.json())
       .use('/api/Aprediz', aprendiz)
       .use('/api/instrutor',instrutor )
       .use('/api/turma', turma)
       .use('/api/auth', auth)

}