import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { cores, espaco } from "../constants/tema";

export function Carregando() {
  return (
    <View style={styles.centro}>
      <ActivityIndicator size="large" color={cores.tinta} />
      <Text style={styles.texto}>Buscando na API…</Text>
    </View>
  );
}

export function Erro({ mensagem, onTentarDeNovo }) {
  return (
    <View style={styles.centro}>
      <Text style={styles.titulo}>Não deu pra carregar</Text>
      <Text style={styles.texto}>{mensagem}</Text>
      <Pressable style={styles.botao} onPress={onTentarDeNovo}>
        <Text style={styles.textoBotao}>Tentar de novo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: espaco.p,
    padding: espaco.g,
    backgroundColor: cores.fundo,
  },
  titulo: { fontSize: 18, fontWeight: "700", color: cores.tinta },
  texto: { color: cores.suave, textAlign: "center" },
  botao: {
    marginTop: espaco.p,
    backgroundColor: cores.tinta,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  textoBotao: { color: "#FFFFFF", fontWeight: "700" },
});