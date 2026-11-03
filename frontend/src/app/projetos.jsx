import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Carregando, Erro } from "../components/Estado";
import { Tag } from "../components/Tag";
import { cores, espaco } from "../constants/tema";
import { useApi } from "../hooks/useApi";
import { getProjetos } from "../services/api";

export default function Projetos() {
  const { dados: projetos, carregando, erro, recarregar } = useApi(getProjetos);
  const [filtro, setFiltro] = useState(null); // null = todas as tecnologias

  if (carregando) {
    return <Carregando />;
  }
  if (erro) {
    return <Erro mensagem={erro} onTentarDeNovo={recarregar} />;
  }

  const tecnologias = [
    ...new Set(projetos.flatMap((p) => p.tecnologias.map((t) => t.nome))),
  ].sort();

  const visiveis = filtro
    ? projetos.filter((p) => p.tecnologias.some((t) => t.nome === filtro))
    : projetos;

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.ajuda}>Filtrar por tecnologia</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
        <Tag texto="Todas" ativa={filtro === null} onPress={() => setFiltro(null)} />
        {tecnologias.map((nome) => (
          <Tag key={nome} texto={nome} ativa={filtro === nome} onPress={() => setFiltro(nome)} />
        ))}
      </ScrollView>

      <Text style={styles.contagem}>
        {visiveis.length} de {projetos.length} projetos
      </Text>

      {visiveis.map((projeto) => (
        <View key={projeto.id} style={styles.cartao}>
          <Text style={styles.nome}>{projeto.nome}</Text>
          {projeto.descricao ? <Text style={styles.descricao}>{projeto.descricao}</Text> : null}
          <View style={styles.tags}>
            {projeto.tecnologias.map((t) => (
              <Tag key={t.id} texto={t.nome} ativa={t.nome === filtro} />
            ))}
          </View>
          {projeto.link ? (
            <Pressable style={styles.botao} onPress={() => Linking.openURL(projeto.link)}>
              <Ionicons name="open-outline" size={16} color={cores.tinta} />
              <Text style={styles.textoBotao}>Ver projeto</Text>
            </Pressable>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { backgroundColor: cores.fundo },
  conteudo: { padding: espaco.m, gap: espaco.m },
  ajuda: { fontSize: 13, fontWeight: "800", color: cores.suave, textTransform: "uppercase", letterSpacing: 1 },
  filtros: { gap: espaco.p, paddingRight: espaco.m },
  contagem: { color: cores.suave },
  cartao: { backgroundColor: cores.cartao, borderRadius: 14, padding: espaco.m, gap: espaco.p },
  nome: { fontSize: 18, fontWeight: "800", color: cores.tinta },
  descricao: { fontSize: 15, color: cores.texto, lineHeight: 21 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: cores.destaqueSuave,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 4,
  },
  textoBotao: { color: cores.tinta, fontWeight: "700" },
});