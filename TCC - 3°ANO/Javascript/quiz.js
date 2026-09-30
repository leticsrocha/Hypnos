// Quiz result options in a separate object for flexibility
var resultOptions = [
    {
        title: '<h1 class="tituloquiz"><br></h1>',
        desc: '<div class="divquiz"><h1 class="tituloquiz">Cuidado:</h1><p class="textoquiz"><br> Suas noites são muito mal dormidas, isso pode gerar uma grande quantidade de problemas no nosso corpo. Os danos percebidos imediatamente após uma noite de sono inadequado são: dificuldade de concentração, indisposição, diminuição da produtividade e criatividade, redução da capacidade de memória e instabilidade emocional.<br> Para te ajudar a dormir melhor, separamos uma playlist especialmente para você que tem dificuldades para relaxar de noite:<br><br></p><a href="../Paginas/mini1.html"><img src="../Imagens/playlists/rain.jpg" class="imagemquiz"/></a></div>'
    },
    {
        title: '<h1 class="tituloquiz"><br></h1>',
        desc: '<div class="divquiz"><h1 class="tituloquiz">Mais atenção em seu sono</h1><p class="textoquiz"><br> Conforme suas respostas, parece que você não dorme tão bem quanto deveria. Noites mal dormidas geram uma grande quantidade de problemas no nosso corpo. Os danos percebidos imediatamente após uma noite de sono inadequado são: dificuldade de concentração, indisposição, diminuição da produtividade e criatividade, redução da capacidade de memória e instabilidade emocional.<br> Sabe o que vai te ajudar? Relaxar com essa incrível playlist que separamos especialmente para você:<br><br></p><a href="../Paginas/mini2.html"><img src="../Imagens/playlists/benaural.jpg" class="imagemquiz"/></a></div>'
    },
    {
        title: '<h1 class="tituloquiz"><br></h1>',
        desc: '<div class="divquiz"><h1 class="tituloquiz">Pode melhorar...</h1><p class="textoquiz"><br> Seu resultado foi insuficiente, saiba que o sono é fundamental para a vida de qualquer ser vivo, que tal dar um pouco mais de atenção para seu sono? Garanto que sua qualidade de vida vai melhorar muito. E para te auxiliar nessa jornada, separamos uma ótima lista de reprodução para te ajudar a dormir. Aperte o play e bons sonhos:<br><br></p><a href="../Paginas/mini3.html"><img src="../Imagens/playlists/classica.jpg" class="imagemquiz"/></a></div>'
    },
    {
        title: '<h1 class="tituloquiz"><br></h1>',
        desc: '<div class="divquiz"><h1 class="tituloquiz">Está quase lá!</h1><p class="textoquiz"><br> Pelas suas respostas, notamos que falta pouco para você chegar no ideal de saúde do sono, mas não se preocupe, um dia você chega lá. <br> Enquanto isso, para te ajudar a atingir este objetivo, preparamos especialmente para você essa lista de reprodução superespecial:<br><br></p><a href="../Paginas/mini4.html"><img src="../Imagens/playlists/chuva.jpg" class="imagemquiz"/></a></div>'
    },
    {
        title: '<h1 class="tituloquiz"><br></h1>',
        desc: '<div class="divquiz"><h1 class="tituloquiz">Parabéns:</h1><p class="textoquiz"><br> Suas noites bem dormidas vão ajudar muito o seu corpo por muito tempo. É durante o sono que o organismo exerce as principais funções restauradoras do corpo, como o reparo dos tecidos, o crescimento muscular e a síntese de proteínas. Durante este momento, é possível repor energias e regular o metabolismo, fatores essenciais para manter corpo e mente saudáveis. Dormir bem é, então, hábito que deve ser incluído na rotina de todos.<br> Para ser mais fácil relaxar, tente ouvir um som especial:<br><br></p><a href="../Paginas/mini5.html"><img src="../Imagens/playlists/lofi.jpg" class="imagemquiz"/></a></div>'
    }
];

// global variables
var quizSteps = $('#quizzie .quiz-step'),
    totalScore = 0;

// for each step in the quiz, add the selected answer value to the total score
// if an answer has already been selected, subtract the previous value and update total score with the new selected answer value
// toggle a visual active state to show which option has been selected
quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.children('.quiz-answer');
    // for each option per step, add a click listener
    // apply active class and calculate the total score
    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);
        function check() {
            var $this = $(this),
                value = $this.attr('data-quizIndex'),
                answerScore = parseInt(value);
            // check to see if an answer was previously selected
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldScoreValue = wasActive.attr('data-quizIndex'),
                    oldScore = parseInt(oldScoreValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
                totalScore -= oldScoreValue;
                totalScore += answerScore;
                calcResults(totalScore);
            } else {
                // handle visual active state
                $this.addClass('active');
                // handle score calculation
                totalScore += answerScore;
                calcResults(totalScore);
                // handle current step
                updateStep(currentStep);
            }
        }
    });
});

// show current step/hide other steps
function updateStep(currentStep) {
    if (currentStep.hasClass('current')) {
        currentStep.removeClass('current');
        currentStep.next().addClass('current');
    }
}

// display scoring results
function calcResults(totalScore) {
    // only update the results div if all questions have been answered
    if (quizSteps.find('.active').length == quizSteps.length) {
        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc');

        // calc lowest possible score
        var lowestScoreArray = $('#quizzie .low-value').map(function () {
            return $(this).attr('data-quizIndex');
        });
        var minScore = 0;
        for (var i = 0; i < lowestScoreArray.length; i++) {
            minScore += lowestScoreArray[i] << 0;
        }
        // calculate highest possible score
        var highestScoreArray = $('#quizzie .high-value').map(function () {
            return $(this).attr('data-quizIndex');
        });
        var maxScore = 0;
        for (var i = 0; i < highestScoreArray.length; i++) {
            maxScore += highestScoreArray[i] << 0;
        }
        // calc range, number of possible results, and intervals between results
        var range = maxScore - minScore,
            numResults = resultOptions.length,
            interval = range / (numResults - 1),
            increment = '',
            n = 0; //increment index
        // incrementally increase the possible score, starting at the minScore, until totalScore falls into range. then match that increment index (number of times it took to get totalScore into range) and return the corresponding index results from resultOptions object
        while (n < numResults) {
            increment = minScore + (interval * n);
            if (totalScore <= increment) {
                // populate results
                resultsTitle.replaceWith("<h1>" + resultOptions[n].title + "</h1>");
                resultsDesc.replaceWith("<p class='desc'>" + resultOptions[n].desc + "</p>");
                return;
            } else {
                n++;
            }
        }
    }
}