-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_id_criador_fkey" FOREIGN KEY ("id_criador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_id_lider_fkey" FOREIGN KEY ("id_lider") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
