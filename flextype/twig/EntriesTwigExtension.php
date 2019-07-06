<?php

/**
 * @package Flextype
 *
 * @author Sergey Romanenko <hello@romanenko.digital>
 * @link http://romanenko.digital
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Flextype;

class EntriesTwigExtension extends \Twig_Extension implements \Twig_Extension_GlobalsInterface
{
    /**
     * Flextype Dependency Container
     */
    private $flextype;

    /**
     * Constructor
     */
    public function __construct($flextype)
    {
        $this->flextype = $flextype;
    }

    /**
     * Register Global variables in an extension
     */
    public function getGlobals()
    {
        return [
            'entries' => new EntriesTwig($this->flextype)
        ];
    }
}

class EntriesTwig
{
    /**
     * Flextype Dependency Container
     */
    private $flextype;

    /**
     * Constructor
     */
    public function __construct($flextype)
    {
        $this->flextype = $flextype;
    }

    /**
     * Fetch single entry
     */
    public function fetch(string $id)
    {
        return $this->flextype['entries']->fetch($id);
    }

    /**
     * Fetch all entries
     */
    public function fetchAll(string $id, array $args = []) : array
    {
        return $this->flextype['entries']->fetchAll($id, $args);
    }
}
