import { StyleSheet, Text, View } from "react-native";
import { cores, espaco } from "../constants/tema";
import { formatarPeriodo } from "../utils/datas";

export function ItemLinhaDoTempo({ titulo, subtitulo, inicio, fim, descricao, ultimo }) {
  return (
    <View style={styles.linha}>
      <View style={styles.trilho}>
        <View style={[styles.bolinha, !fim && styles.bolinhaAtual]} />
        {!ultimo && <View style={styles.traco} />}
      </View>
      <View style={styles.conteudo}>
        <Text style={styles.periodo}>{formatarPeriodo(inicio, fim)}</Text>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subtitulo}>{subtitulo}</Text>
        {descricao ? <Text style={styles.descricao}>{descricao}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", gap: espaco.m },
  trilho: { alignItems: "center", width: 16 },
  bolinha: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: cores.tinta,
    backgroundColor: cores.cartao,
    marginTop: 4,
  },
  bolinhaAtual: { backgroundColor: cores.destaque, borderColor: cores.destaque },
  traco: { flex: 1, width: 2, backgroundColor: cores.linha, marginTop: 4 },
  conteudo: { flex: 1, paddingBottom: espaco.g, gap: 2 },
  periodo: { fontSize: 12, fontWeight: "700", color: cores.suave, textTransform: "uppercase", letterSpacing: 0.5 },
  titulo: { fontSize: 17, fontWeight: "700", color: cores.tinta },
  subtitulo: { fontSize: 15, color: cores.texto },
  descricao: { fontSize: 14, color: cores.suave, marginTop: 4, lineHeight: 20 },
});