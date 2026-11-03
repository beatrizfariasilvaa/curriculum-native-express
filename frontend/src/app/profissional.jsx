import { ScrollView, StyleSheet, Text } from "react-native";
import { Carregando, Erro } from "../components/Estado";
import { ItemLinhaDoTempo } from "../components/ItemLinhaDoTempo";
import { cores, espaco } from "../constants/tema";
import { useApi } from "../hooks/useApi";
import { getProfissionais } from "../services/api";

export default function Profissional() {
  const { dados: lista, carregando, erro, recarregar } = useApi(getProfissionais);

  if (carregando) {
    return <Carregando />;
  }
  if (erro) {
    return <Erro mensagem={erro} onTentarDeNovo={recarregar} />;
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {lista.length === 0 ? <Text style={styles.vazio}>Nenhuma experiência cadastrada.</Text> : null}
      {lista.map((item, i) => (
        <ItemLinhaDoTempo
          key={item.id}
          titulo={item.cargo}
          subtitulo={item.empresa}
          inicio={item.inicio}
          fim={item.fim}
          descricao={item.descricao}
          ultimo={i === lista.length - 1}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { backgroundColor: cores.fundo },
  conteudo: { padding: espaco.m, paddingTop: espaco.g },
  vazio: { color: cores.suave, textAlign: "center" },
});