import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Tag } from "../components/Tag";
import { API_URL } from "../constants/config";
import { cores, espaco } from "../constants/tema";

const tecnologiasDoApp = [
  "React Native",
  "Expo SDK 58",
  "Expo Router (abas)",
  "@expo/vector-icons",
  "fetch + hook useApi",
  "EAS Update",
];

const tecnologiasDaApi = [
  "Node.js",
  "Express 5",
  "Sequelize",
  "PostgreSQL (Neon)",
  "Vercel",
  "Postman",
];

function Secao({ titulo, children }) {
  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo}>{titulo}</Text>
      {children}
    </View>
  );
}

export default function Sobre() {
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Secao titulo="O app">
        <Text style={styles.texto}>
          Meu currículo em React Native. Todas as informações vêm da minha API REST, buscadas
          quando cada tela abre.
        </Text>
        <View style={styles.tags}>
          {tecnologiasDoApp.map((t) => (
            <Tag key={t} texto={t} />
          ))}
        </View>
      </Secao>

      <Secao titulo="A API">
        <View style={styles.tags}>
          {tecnologiasDaApi.map((t) => (
            <Tag key={t} texto={t} />
          ))}
        </View>
        <Text style={styles.endereco}>{API_URL}</Text>
      </Secao>

      <Secao titulo="Funcionalidade extra">
        <Text style={styles.texto}>
          Filtro de projetos por tecnologia: na aba Projetos, toque numa tecnologia para ver só os
          projetos que a usam. As opções do filtro são montadas a partir do relacionamento N:N entre
          projetos e tecnologias da API.
        </Text>
      </Secao>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { backgroundColor: cores.fundo },
  conteudo: { padding: espaco.m, gap: espaco.m },
  cartao: { backgroundColor: cores.cartao, borderRadius: 14, padding: espaco.m, gap: espaco.p },
  titulo: { fontSize: 18, fontWeight: "800", color: cores.tinta },
  texto: { fontSize: 15, color: cores.texto, lineHeight: 22 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  endereco: { fontSize: 13, color: cores.suave },
});