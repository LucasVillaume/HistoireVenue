class Theme:
    def __init__(self, name):
        self.name = name
        self.q100 = []
        self.q200 = []
        self.q300 = []
        self.q400 = []

    def add_question(self, question, points):
        if points == 100:
            self.q100.append(question)
        elif points == 200:
            self.q200.append(question)
        elif points == 300:
            self.q300.append(question)
        elif points == 400:
            self.q400.append(question)
    
    def __str__(self):
        return f"{self.name}\n" + "\n".join([str(q) for q in self.q100]) + "\n" + "\n".join([str(q) for q in self.q200]) + "\n" + "\n".join([str(q) for q in self.q300]) + "\n" + "\n".join([str(q) for q in self.q400])

class Question:
    def __init__(self, question, answer, points):
        self.question = question
        self.answer = answer
        self.points = points

    def __str__(self):
        return f"{self.question} / {self.answer} / {self.points}"


def sanitize_string(string):
    return string.replace("\"", "\\\"")


def extracr_themes(file):
    themes = []
    with open(file, 'r') as f:
        lines = f.readlines()
        for line in lines:
            line = sanitize_string(line)
            if line.startswith("#"):
                themes.append(Theme(line[1:].strip()))
            elif line != "\n":
                question, answer, points = line.split(";")[:-1]
                themes[-1].add_question(Question(question, answer, int(points)), int(points))
    return themes


def convert_to_json(themes):
    json = "{ \"themes\":["
    for theme in themes:
        json += "{ \"name" + "\":\"" + theme.name + "\","
        json += "\"q100\":[" + ",".join([f"{{\"question\":\"{q.question}\",\"answer\":\"{q.answer}\",\"points\":{q.points}}}" for q in theme.q100]) + "],"
        json += "\"q200\":[" + ",".join([f"{{\"question\":\"{q.question}\",\"answer\":\"{q.answer}\",\"points\":{q.points}}}" for q in theme.q200]) + "],"
        json += "\"q300\":[" + ",".join([f"{{\"question\":\"{q.question}\",\"answer\":\"{q.answer}\",\"points\":{q.points}}}" for q in theme.q300]) + "],"
        json += "\"q400\":[" + ",".join([f"{{\"question\":\"{q.question}\",\"answer\":\"{q.answer}\",\"points\":{q.points}}}" for q in theme.q400]) + "]}"
        if theme != themes[-1]:
            json += ","

    return json + "]}"


if __name__ == '__main__':
    themes = extracr_themes("questions.csv")
    json = convert_to_json(themes)
    with open("questions.json", 'w') as f:
        f.write(str(json))
