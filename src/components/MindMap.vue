<template>
  <div id="middle_block">
    <label v-if="this.$store.getters.getIsLogin" @click="upgMindMap"><i class="layui-icon layui-icon-ok" style="font-size: large;margin: 5%"></i></label>
    <vD ref="viewD"></vD>
    <div id="mindmap_block" style="width:100%;height:120%;background-color: transparent;box-shadow:0px 0px 8px 5px #ccc;margin-bottom:1%">
      <div
        ref="mindmap"
        class="hTree bar"
        style="overflow: scroll;height: 120%"
      ></div>
    </div>
  </div>
</template>

<script>
import vD from "./Detail";
export default {
  components: {
    vD
  },
  data() {
    return {
      nodeCnt: 0,
      details: {},
      menusListArr: [
        {
          key: "add-child",
          name: "添加子节点"
        },
        {
          key: "rename",
          name: "重命名"
        },
        {
          key: "delete",
          name: "删除"
        }
      ]
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw: function() {
      var this_vue = this;

      layer.open({
        id: 1,
        type: 1,
        title: this_vue.$route.query.mindmap_name,
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="layui-row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<div class="layui-col-md7">' +
          '<div class="input-group">' +
          '<span class="input-group-addon" style="font-size: large;margin: 2%">简介：</span>' +
          "<p style='font-size:medium;margin: 2%'>" +
          this_vue.$route.query.brief +
          "</p>" +
          "</div>" +
          "</div>" +
          "</div>",
        btn: ["确定"],
        btn1: function(index, layero) {
          layer.close(index);
        }
      });

      (function($) {
        // var nodeCnt = 0;
        // var details = {};
        ("use strict");
        var defaultOpts = {
          auth: false,
          url: "",
          method: "",
          onSelect: function(resp, rr) {
            console.log(resp);
          }
        };
        var currentNodeLevel = 0;
        var _options = undefined;
        var $body = undefined;

        $.fn.mindMap = function(opts) {
          var $tree = this;
          $tree.empty();
          _options = $.extend(true, {}, defaultOpts, opts);

          //点击空白处 收缩节点功能菜单
          $body = $("body");
          $body.off("hide-node").on("hide-node", function(e) {
            var $menusEle = $(this).find(".isSpread");
            var $nodeDetail = $(this).find(".active");

            if ($menusEle) {
              $menusEle.removeClass("isSpread");
              $menusEle
                .parent()
                .next()
                .hide(200);
            }
            if ($nodeDetail) {
              $nodeDetail.removeClass("active");
              $nodeDetail
                .parent()
                .parent()
                .next()
                .hide(200);
            }
          });

          $body.on("click", function(event) {
            $(this).trigger("hide-node");
          });

          var $factorTypeContainer = $(
            '<div class="factor-type-container"></div>'
          );

          for (var j in _options.data) {
            for (var k in _options.data[j]) {
              _options.data[j][k].root = true;
              currentNodeLevel = 0;
            }

            $factorTypeContainer
              .clone()
              .append(mindmap_initTree(_options.data[j]))
              .appendTo($tree);
          }
        };

        //初始化树
        function mindmap_initTree(data, isChanged) {
          var $ul = $('<ul class="branch-node-container"></ul>');
          var $li;
          currentNodeLevel++;
          if (currentNodeLevel > 2 && !isChanged) {
            $ul.addClass("hidden");
          }
          for (var i in data) {
            if (data[i].root) {
              $ul.addClass("trunk-node");
            } else {
              $ul.addClass("child-node");
            }

            $li = mindmap_initNode(data[i]);
            //消除单节点 最后多出来的竖线
            if (data.length == 1) {
              $li.addClass("only-one-child-node");
            }
            $li.appendTo($ul);
          }
          return $ul;
        }

        //生成单个节点
        function mindmap_initNode(node) {
          var $li = $('<li class="leaf-node-container"></li>');
          var $nodeContainer = $('<div class="node-container"></div>');
          $nodeContainer.attr(
            "id",
            this_vue.$route.query.mindmap_name + this_vue.nodeCnt
          );
          this_vue.details[
            this_vue.$route.query.mindmap_name + this_vue.nodeCnt
          ] = node.detail;
          ++this_vue.nodeCnt;
          var $nodeTitleContainer = $(
            '<div class="node-title-container"></div>'
          );
          var $em = $("<em></em>");
          var $nodeDropContentBody = $("<div></div>");

          var $nodeTitleName = $('<div class="title-name layui-elip"></div>');
          var $tAEle = $(
            '<a class="layui-elip" title="' +
              node.elementName +
              '" class="mindmap-link"></a>'
          );
          $tAEle.text(node.elementName);

          var $unfoldBtn = $('<i class="unfold-btn"></i>');
          //生成当前节点的权限功能菜单

          var $menusIcon = $('<i class="menus-btn"></i>');
          var $showNodeMenusBox = $(
            '<div class="node-menus-box hidden"></div>'
          );
          var $menuListUl = $('<ul class="menus-list"></ul>');
          var $menuListItemLi = $('<li class="menus-list-item"></li>');
          var nodeMenus = _options.nodeMenus.slice(0);

          if (!node.permissionValue) {
            nodeMenus = nodeMenus.splice(nodeMenus.length - 1);
          }

          var menuClick = [3];
          menuClick[0] = function(obj) {
            var $container = $(
              $(
                $($($(obj.target).parent()[0]).parent()[0]).parent()[0]
              ).parent()[0]
            );
            var nodeId = $container.attr("id");
            var $ul = $($container.next()[0]);
            if ($container.next()[0] == undefined) {
              // 原节点无子节点，现要加入一个子节点
              var $namediv = $(
                $($($(obj.target).parent()[0]).parent()[0]).prev()[0]
              );
              var name = $namediv.text();
              var newNode = {
                elementName: name,
                detail: this_vue.details[nodeId],
                childElements: [
                  {
                    elementName: "unknown",
                    detail: {
                      left_urls: [],
                      right_urls: []
                    },
                    childElements: [],
                    permissionValue: 1,
                    rootQNum: 0,
                    isChange: 0
                  }
                ],
                permissionValue: 1,
                rootQNum: 0,
                isChange: 0
              };
              var $li = $($container.parent()[0]);
              var isRoot = $container.hasClass("root");
              var isOnly = $li.hasClass("only-one-child-node");
              var $newNode = mindmap_initNode(newNode);
              if (isOnly) {
                $newNode.addClass("only-one-child-node");
              }
              if (isRoot) {
                $($newNode.children("div")[0]).addClass("root");
              }
              $li.replaceWith($newNode);
              delete this_vue.details[nodeId];
            } else {
              var $appendli = mindmap_initNode({
                elementName: "unknown",
                detail: {
                  left_urls: [],
                  right_urls: []
                },
                childElements: [],
                permissionValue: 1,
                rootQNum: 0,
                isChange: 0
              });
              if ($ul.children().length == 1) {
                $($ul.children()[0]).removeClass("only-one-child-node");
              }
              $ul.append($appendli);
            }
          };
          menuClick[1] = function(obj) {
            var name = prompt("更改为", "unknown");
            var $namea = $(
              $($($($(obj.target).parent()[0]).parent()[0]).prev()[0]).children(
                "a"
              )[0]
            );
            if (name != null && name != "") {
              $namea.text(name);
              $namea.attr("title", name);
            }
          };
          menuClick[2] = function(obj) {
            var $container = $(
              $(
                $($($(obj.target).parent()[0]).parent()[0]).parent()[0]
              ).parent()[0]
            );
            var nodeId = $container.attr("id");
            var $includedul = $($($container.parent()[0]).parent()[0]);
            var $includedli = $($container.parent()[0]);
            var ullen = $includedul.children("li").length;
            console.log(ullen);
            if (ullen == 1) {
              var $parentContainer = $($includedul.prev()[0]);
              var parentNodeId = $parentContainer.attr("id");
              var $namediv = $($parentContainer.find("a")[0]);
              var name = $namediv.text();
              var newNode = {
                elementName: name,
                detail: this_vue.details[parentNodeId],
                childElements: [],
                permissionValue: 1,
                rootQNum: 0,
                isChange: 0
              };
              var isRoot = $parentContainer.hasClass("root");
              var $parentli = $($parentContainer.parent()[0]);
              var $newli = mindmap_initNode(newNode);
              if (isRoot) {
                $($newli.children("div")[0]).addClass("root");
              } // once had a bug???
              $parentli.replaceWith($newli);
              delete this_vue.details[parentNodeId];
            }
            $includedli.remove();
            delete this_vue.details[nodeId];
            if (ullen == 2) {
              var $leftli = $($includedul.children("li")[0]);
              $leftli.addClass("only-one-child-node");
            }
          };
          var menuOpt = [];
          for (var k in nodeMenus) {
            (function(n) {
              menuOpt.push(
                $menuListItemLi.clone().on("click", function(e) {
                  e.stopPropagation();
                  var $menusEle = $("body").find(".isSpread");
                  if ($menusEle) {
                    $menusEle.removeClass("isSpread");
                    $menusEle
                      .parent()
                      .next()
                      .hide(200);
                  }
                  _options.onSelect.call(this, nodeMenus[n], node);
                })
              );
              menuOpt[n].text(nodeMenus[n].name).appendTo($menuListUl);
              menuOpt[n].on("click", menuClick[n]);
            })(k);
          }

          $showNodeMenusBox.append($menuListUl);

          //处理标题的title
          $nodeTitleName
            .append($unfoldBtn)
            .append($tAEle)
            .append($menusIcon);

          $nodeTitleContainer.append($nodeTitleName).append($showNodeMenusBox);
          $nodeContainer.append($nodeTitleContainer);

          //处理内容content
          if (node.root) {
            $nodeContainer.addClass("root");
          }

          $nodeContainer.appendTo($li);

          //为查看节点详情icon 绑定事件
          $tAEle.on("click", function(obj) {
            event.stopPropagation();
            var $container = $(
              $($($(obj.target).parent()[0]).parent()[0]).parent()[0]
            );
            var nodeId = $container.attr("id");

            this_vue.popup(nodeId); //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~todo

            if ($(this).hasClass("active")) {
              $(this).removeClass("active");
              $nodeDropContentBody.empty();
            } else {
              $body.trigger("hide-node");
              $(this).addClass("active");
            }
          });
          //树形节点折叠功能
          $unfoldBtn.on("click", function(event) {
            event.stopPropagation();
            var $that = $(this);
            $body.trigger("hide-node");
            var $currentNodeTitleContainer = $(this)
              .parent()
              .parent();

            if (!$currentNodeTitleContainer.hasClass("remove-end-line")) {
              $currentNodeTitleContainer.addClass("remove-end-line");
              $that.addClass("isFold");
            } else {
              $currentNodeTitleContainer.removeClass("remove-end-line");
              $that.removeClass("isFold");
            }
            $currentNodeTitleContainer
              .parent()
              .next()
              .animate({
                height: "toggle"
              });
            var left = $(this).offset().left;
            console.log(left);

            if (left > 400) {
              $("html .layui-body").animate(
                {
                  scrollLeft: left + 150
                },
                500
              );
            }
          });

          //节点的功能菜单
          $menusIcon.on("click", function(event) {
            var top = $(this).offset().top;
            var left = $(this).offset().left;
            console.log(left);
            console.log(top);
            if (top > 400 || left > 1100) {
              $("html .layui-body").animate(
                {
                  scrollTop: top + 100,
                  scrollLeft: left
                },
                500
              );
            }
            event.stopPropagation();
            if ($(this).hasClass("isSpread")) {
              $(this).removeClass("isSpread");
              $showNodeMenusBox.hide(200);
            } else {
              $body.trigger("hide-node");
              $(this).addClass("isSpread");
              $showNodeMenusBox.show(200);
            }
          });
          if (!isEmptyArr(node.childElements)) {
            //根据需求默认展开前两个节点
            if (currentNodeLevel >= 2 && !node.isChange) {
              $nodeTitleContainer.addClass("remove-end-line");
              $unfoldBtn.addClass("isFold");
            }

            var $ul = mindmap_initTree(node.childElements, node.isChange);

            //判断当前树的节点是否超过两级  超过两级的部分收缩

            $ul.appendTo($li);
          } else {
            $li.addClass("no-child-node");
            node.isChange &&
              _options.method &&
              $nodeTitleContainer.addClass("focus-node");
          }
          return $li;
        }

        //判断当前值是否为数组和空数组
        function isEmptyArr(array) {
          return array === undefined || array.length === 0;
        }

        function mindmap_toJson(liObj) {
          var $container = $($(liObj).children("div")[0]);
          var nodeId = $container.attr("id");
          var $ul = $($(liObj).children("ul")[0]);
          var $a = $($container.find("a")[0]);
          var node = {
            elementName: $a.text(),
            detail: this_vue.details[nodeId],
            childElements: [],
            permissionValue: 1,
            rootQNum: 0,
            isChange: 0
          };
          var lis = $ul.children();
          for (var i = 0; i < lis.length; i++) {
            node.childElements.push(mindmap_toJson(lis[i]));
          }
          return node;
        }

        //自定义表单序列化的函数
        $.fn.mindmap_serializeJson = function() {
          var liObj = this.find("li")[0];
          return mindmap_toJson(liObj);
        };
      })(jQuery);

      $(this.$refs.mindmap).mindMap({
        data: this.$route.query.data,
        nodeMenus: this.menusListArr,
        onSelect: this.onSelect
      });
    },
    popup: function(nodeId) {
      this.$refs.viewD.addurls(this.details[nodeId], nodeId);
      this.$refs.viewD.popup();
    },
    upgradedetails: function(detail, nodeId) {
      this.details[nodeId] = detail;
      console.log(this.details[nodeId]);
    },
    upgMindMap: function() {
      var mindmap = JSON.stringify(
        $(this.$refs.mindmap).mindmap_serializeJson()
      );
      var json = {
        username: this.$store.getters.getUserName,
        id: this.$route.query.id,
        data: mindmap
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/upgaMindMap",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully saved!", {
              icon: 1,
              time: 2000
            });
          } else {
            layer.msg("Fail to save it!", {
              icon: 2,
              time: 2000
            });
          }
        });
    },
    onSelect: function(resp) {
      console.log(resp);
    }
  }
};
</script>

<style scoped>
</style>
