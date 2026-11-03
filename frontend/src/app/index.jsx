import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Carregando, Erro } from "../components/Estado";
import { cores, espaco } from "../constants/tema";
import { useApi } from "../hooks/useApi";
import { getCurriculo } from "../services/api";

function iniciais(nome) {
  const partes = nome.trim().split(" ");
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export default function Home() {
  const { dados: pessoa, carregando, erro, recarregar } = useApi(getCurriculo);

  if (carregando) {
    return <Carregando />;
  }
  if (erro) {
    return <Erro mensagem={erro} onTentarDeNovo={recarregar} />;
  }

  const atual = pessoa.experienciasProfissionais.find((e) => !e.fim);

  const links = [
    { icone: "logo-github", rotulo: "GitHub", url: pessoa.github },
    { icone: "logo-linkedin", rotulo: "LinkedIn", url: pessoa.linkedin },
    { icone: "mail", rotulo: "E-mail", url: `mailto:${pessoa.email}` },
  ].filter((link) => link.url);

  const numeros = [
    { valor: pessoa.experienciasAcademicas.length, rotulo: "formações" },
    { valor: pessoa.experienciasProfissionais.length, rotulo: "experiências" },
    { valor: pessoa.projetos.length, rotulo: "projetos" },
  ];

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.hero}>
        {pessoa.fotoUrl ? (
          <Image source={{ uri: pessoa.fotoUrl }} style={styles.foto} />
        ) : (
          <View style={styles.foto}>
            <Text style={styles.iniciais}>{iniciais(pessoa.nome)}</Text>
          </View>
        )}
        <Text style={styles.nome}>{pessoa.nome}</Text>
        <Text style={styles.titulo}>{pessoa.titulo}</Text>
        {pessoa.cidade ? (
          <Text style={styles.cidade}>
            <Ionicons name="location" size={14} /> {pessoa.cidade}
          </Text>
        ) : null}
      </View>

      <View style={styles.links}>
        {links.map((link) => (
          <Pressable key={link.rotulo} style={styles.link} onPress={() => Linking.openURL(link.url)}>
            <Ionicons name={link.icone} size={18} color={cores.tinta} />
            <Text style={styles.textoLink}>{link.rotulo}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.numeros}>
        {numeros.map((n) => (
          <View key={n.rotulo} style={styles.numero}>
            <Text style={styles.valor}>{n.valor}</Text>
            <Text style={styles.rotulo}>{n.rotulo}</Text>
          </View>
        ))}
      </View>

      {pessoa.resumo ? (
        <View style={styles.cartao}>
          <Text style={styles.secao}>Sobre mim</Text>
          <Text style={styles.paragrafo}>{pessoa.resumo}</Text>
        </View>
      ) : null}

      {atual ? (
        <View style={[styles.cartao, styles.cartaoDestaque]}>
          <Text style={styles.secao}>Agora</Text>
          <Text style={styles.paragrafo}>
            {atual.cargo} na <Text style={styles.forte}>{atual.empresa}</Text>
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { backgroundColor: cores.fundo },
  conteudo: { paddingBottom: espaco.g, gap: espaco.m },
  hero: {
    backgroundColor: cores.tinta,
    alignItems: "center",
    paddingTop: espaco.g,
    paddingBottom: 40,
    paddingHorizontal: espaco.m,
    gap: 4,
  },
  foto: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: cores.destaque,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: espaco.p,
  },
  iniciais: { fontSize: 38, fontWeight: "800", color: cores.tinta },
  nome: { fontSize: 26, fontWeight: "800", color: "#FFFFFF", textAlign: "center" },
  titulo: { fontSize: 16, color: cores.destaque, fontWeight: "600", textAlign: "center" },
  cidade: { fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 4 },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    gap: espaco.p,
    marginTop: -28,
    paddingHorizontal: espaco.m,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: cores.cartao,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  textoLink: { color: cores.tinta, fontWeight: "700" },
  numeros: { flexDirection: "row", gap: espaco.p, paddingHorizontal: espaco.m },
  numero: {
    flex: 1,
    backgroundColor: cores.cartao,
    borderRadius: 14,
    paddingVertical: espaco.m,
    alignItems: "center",
  },
  valor: { fontSize: 28, fontWeight: "800", color: cores.tinta },
  rotulo: { fontSize: 13, color: cores.suave },
  cartao: {
    backgroundColor: cores.cartao,
    borderRadius: 14,
    padding: espaco.m,
    marginHorizontal: espaco.m,
    gap: 6,
  },
  cartaoDestaque: { backgroundColor: cores.destaqueSuave },
  secao: { fontSize: 13, fontWeight: "800", color: cores.suave, textTransform: "uppercase", letterSpacing: 1 },
  paragrafo: { fontSize: 16, color: cores.texto, lineHeight: 23 },
  forte: { fontWeight: "700", color: cores.tinta },
});