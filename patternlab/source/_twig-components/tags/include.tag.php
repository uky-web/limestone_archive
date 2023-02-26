<?php

/**
 * Includes a template, with a wrapper
 *
 * <pre>
 *   {% include 'header.html' %}
 *     Body
 *   {% include 'footer.html' %}
 * </pre>
 */
if (!class_exists("Project_include_TokenParser")):

class Project_include_TokenParser extends Twig_TokenParser_Include
{
    public function parse(Twig_Token $token)
    {
        $expr = $this->parser->getExpressionParser()->parseExpression();

        list($variables, $only, $ignoreMissing) = $this->parseArguments();

        return new Project_include_Node($expr, $variables, $only, $ignoreMissing, $token->getLine(), $this->getTag());
    }

    public function getTag()
    {
        return 'include';
    }
}

endif;

if (!class_exists("Project_include_Node")):

class Project_include_Node extends Twig_Node_Include
{
    public function compile(Twig_Compiler $compiler)
    {
        $expr = $this->getNode('expr');

        $name = null;
        if ($expr->hasAttribute('value')) {
            $name = $expr->getAttribute('value');
        }

        $compiler->addDebugInfo($this);

        if ($name) {
            // echo $name . "\n";
            $compiler
                ->write("echo '<!-- TWIG INCLUDE : " . $name . "\" -->';\n");
        }

        if ($this->getAttribute('ignore_missing')) {
            $compiler
                ->write("try {\n")
                ->indent()
            ;
        }

        $this->addGetTemplate($compiler);

        $compiler->raw('->display(');

        $this->addTemplateArguments($compiler);

        $compiler->raw(");\n");

        if ($this->getAttribute('ignore_missing')) {
            $compiler
                ->outdent()
                ->write("} catch (Twig_Error_Loader \$e) {\n")
                ->indent()
                ->write("// ignore missing template\n")
                ->outdent()
                ->write("}\n\n")
            ;
        }

        if ($name) {
            $compiler
                 ->write("echo '<!-- END TWIG INCLUDE : " . $name . "\" -->';\n");
        }
    }

}

endif;
