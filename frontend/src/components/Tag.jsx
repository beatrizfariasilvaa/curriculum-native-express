import { Pressable, StyleSheet, Text } from "react-native";
import { cores } from "../constants/tema";

export function Tag({ texto, ativa = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.tag, ativa && styles.tagAtiva]}
    >
      <Text style={[styles.texto, ativa && styles.textoAtivo]}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    borderColor: cores.linha,
    backgroundColor: cores.cartao,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagAtiva: { backgroundColor: cores.tinta, borderColor: cores.tinta },
  texto: { fontSize: 13, color: cores.texto },
  textoAtivo: { color: "#FFFFFF", fontWeight: "700" },
});