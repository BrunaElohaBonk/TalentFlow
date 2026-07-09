import { Express } from 'express'
import express from 'express'
import aprendiz from './aprendiz.ts'
import instrutor from './instrutor.ts'
import turma from './turma.ts'
import auth from './auth.ts'

export default function (app: Express) {
    app
       .use(express.json())
       .use('/api/aprendiz', aprendiz)
       .use('/api/instrutor',instrutor )
       .use('/api/turma', turma)
       .use('/api/auth', auth)
}