import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Fish,
  Waves,
  Sparkles,
  Satellite,
  BatteryCharging,
  ShieldCheck,
  Hand,
  Cloud,
  Gauge,
  Camera,
  LineChart,
  Box,
  Presentation,
  Smartphone,
  PlugZap,
  Activity,
  Workflow,
  Boxes,
  FlameKindling,
  Clock,
  Zap
} from "lucide-react";
import { Line, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, ComposedChart } from "recharts";

// ---------- UI Component Implementations (replacing shadcn/ui) ----------
// This section provides basic implementations for the UI components
// that were originally imported from an external library.

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Card = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-2xl border border-white/10 bg-white/5 text-white shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const Button = forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-500/90",
        secondary: "bg-white/20 border-white/20 text-white hover:bg-white/30",
    };
    const sizes = {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
    };
  return <button className={cn(baseClasses, variants[variant], sizes[size], className)} ref={ref} {...props} />;
});
Button.displayName = "Button";

const Badge = forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
        secondary: "border-transparent bg-white/20 text-white",
    };
    return <div ref={ref} className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />;
});
Badge.displayName = "Badge";

const Input = forwardRef(({ className, ...props }, ref) => (
    <input className={cn("flex h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
));
Input.displayName = "Input";

const TabsContext = React.createContext({});
const Tabs = ({ defaultValue, onValueChange, ...props }) => {
    const [value, setValue] = useState(defaultValue);
    const handleTabChange = (newValue) => {
        setValue(newValue);
        if (onValueChange) onValueChange(newValue);
    };
    return <TabsContext.Provider value={{ value, onTabChange: handleTabChange }}><div {...props} /></TabsContext.Provider>;
};
const TabsList = forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("inline-flex h-10 items-center justify-center rounded-md p-1 text-white/80", className)} {...props} />
));
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef(({ className, value, ...props }, ref) => {
    const { value: selectedValue, onTabChange } = React.useContext(TabsContext);
    const isSelected = value === selectedValue;
    return (
        <button
            ref={ref}
            onClick={() => onTabChange(value)}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isSelected ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5",
                className
            )}
            {...props}
        />
    );
});
TabsTrigger.displayName = "TabsTrigger";

// Accordion Components - Corrected Implementation
const AccordionContext = React.createContext({ value: null, onToggle: () => {} });
const AccordionItemContext = React.createContext({ value: null });

const Accordion = ({ type, collapsible, className, ...props }) => {
    const [value, setValue] = useState(collapsible ? null : undefined);
    
    const onToggle = (itemValue) => {
        if (collapsible) {
            setValue(currentValue => (currentValue === itemValue ? null : itemValue));
        }
    };
    
    return (
        <AccordionContext.Provider value={{ value, onToggle }}>
            <div className={cn("w-full", className)} {...props} />
        </AccordionContext.Provider>
    );
};

const AccordionItem = forwardRef(({ className, value, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn("border-b border-white/10", className)} {...props} />
    </AccordionItemContext.Provider>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef(({ className, children, ...props }, ref) => {
    const { onToggle } = React.useContext(AccordionContext);
    const { value: itemValue } = React.useContext(AccordionItemContext);

    return (
        <h3 className="flex">
            <button
                ref={ref}
                onClick={() => onToggle(itemValue)}
                className={cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)}
                {...props}
            >
                {children}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 transition-transform duration-200">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
        </h3>
    );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef(({ className, children, ...props }, ref) => {
    const { value: selectedValue } = React.useContext(AccordionContext);
    const { value: itemValue } = React.useContext(AccordionItemContext);
    const isOpen = selectedValue === itemValue;

    return (
        <div
            ref={ref}
            className={cn("overflow-hidden text-sm transition-all", isOpen ? 'max-h-[500px] ease-in-out duration-300' : 'max-h-0 ease-in-out duration-200', className)}
            {...props}
        >
            <div className="pb-4 pt-0 text-white/80">{children}</div>
        </div>
    );
});
AccordionContent.displayName = "AccordionContent";


const Checkbox = forwardRef(({ className, ...props }, ref) => (
    <input type="checkbox" ref={ref} className={cn("h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
));
Checkbox.displayName = "Checkbox";

const Label = forwardRef(({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1", className)} {...props} />
));
Label.displayName = "Label";

const Switch = forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            checked ? 'bg-blue-500' : 'bg-white/30',
            className
        )}
        {...props}
        ref={ref}
    >
        <span
            className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                checked ? 'translate-x-5' : 'translate-x-0'
            )}
        />
    </button>
));
Switch.displayName = "Switch";

const TooltipProvider = ({ children }) => <div>{children}</div>;
const Tooltip = ({ children }) => <div>{children}</div>;
const TooltipTrigger = ({ children }) => children;
const TooltipContent = ({ children }) => <div>{children}</div>;

const Progress = ({ value, className }) => (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-white/20", className)}>
        <div className="h-full w-full flex-1 bg-blue-500 transition-all" style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
    </div>
);

const Separator = ({ className }) => <div className={cn("shrink-0 bg-white/10 h-[1px] w-full", className)} />;


// ---------- 小型工具 ----------
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const K = {
  gradient: "bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800",
  glass: "backdrop-blur-xl bg-white/5 border border-white/10",
  title: "text-3xl md:text-5xl font-extrabold tracking-tight",
  subtitle: "text-base md:text-lg text-white/80"
};

const Stat = ({ label, value, sub }) => (
  <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
    <div className="text-2xl font-semibold text-white">{value}</div>
    <div className="text-white/80 text-sm mt-1">{label}</div>
    {sub && <div className="text-white/60 text-xs mt-1">{sub}</div>}
  </div>
);

const Feature = ({ icon: Icon, title, children }) => (
  <Card className={`h-full ${K.glass} text-white`}>  
    <CardHeader className="flex flex-row items-center gap-3">
      <div className="p-2 rounded-xl bg-white/10"><Icon className="w-5 h-5"/></div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-sm/6 text-white/90">{children}</CardContent>
  </Card>
);

const PhoneFrame = ({ children }) => (
  <div className="relative mx-auto aspect-[9/19] w-full max-w-[300px] rounded-[2.2rem] border-2 border-white/10 bg-black shadow-2xl overflow-hidden">
    <div className="absolute inset-0 p-2">
      <div className="h-full w-full rounded-[2rem] bg-neutral-900 overflow-hidden">
        {children}
      </div>
    </div>
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-black/50"/>
  </div>
);

// 模拟数据：水质参数
const waterData = [
  { t: "08:00", temp: 25.1, ph: 7.2, do: 7.8 },
  { t: "10:00", temp: 25.3, ph: 7.3, do: 8.1 },
  { t: "12:00", temp: 25.5, ph: 7.2, do: 8.0 },
  { t: "14:00", temp: 25.6, ph: 7.1, do: 8.2 },
  { t: "16:00", temp: 25.4, ph: 7.2, do: 8.4 },
  { t: "18:00", temp: 25.2, ph: 7.2, do: 8.3 }
];

// ---------- 页面主体 ----------
export default function App() {
  const [ar, setAr] = useState(true);
  const [autoClean, setAutoClean] = useState(true);
  const [feed, setFeed] = useState(true);
  const [metaverse, setMetaverse] = useState(true);

  return (
    <TooltipProvider>
      <main className={`min-h-screen text-white ${K.gradient}`}>
        {/* 顶栏 */}
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
          <Section className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center">
                <Fish className="w-5 h-5"/>
              </div>
              <span className="font-bold tracking-wide">EcoMimic 3.0</span>
              <Badge variant="secondary" className="hidden sm:inline-flex text-xs">多模态仿生式智能水族箱</Badge>
            </div>
            <nav className="hidden md:flex gap-6 text-sm text-white/90">
              <a href="#features" className="hover:text-white">功能</a>
              <a href="#models" className="hover:text-white">款式</a>
              <a href="#console" className="hover:text-white">控制台</a>
              <a href="#specs" className="hover:text-white">规格</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button className="rounded-xl">预订演示</Button>
            </div>
          </Section>
          <Separator className="bg-white/10"/>
        </header>

        {/* 首屏 */}
        <Section className="pt-16 pb-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.6}} className={`${K.title}`}>
                游动即产氧，
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">零门槛的智能水族</span>
              </motion.h1>
              <p className={`mt-4 ${K.subtitle}`}>
                集 AI 视觉、IoT 与“仿生血液”产氧于一体：自主巡航清洁，精准水质调控，AR 第一视角交互，元宇宙虚实同步。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-xl">立即体验</Button>
                <Button size="lg" variant="secondary" className="rounded-xl">下载白皮书</Button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
                <Stat label="AI算力" value="6 TOPS" sub="RK3588S NPU"/>
                <Stat label="仿生关节" value="5 段" sub="亚鲹式推进"/>
                <Stat label="无人化运维" value="7×24h" sub="自动巡航/回充"/>
              </div>
            </div>
            <motion.div initial={{opacity:0, scale:.96}} animate={{opacity:1, scale:1}} transition={{duration:.6, delay:.1}} className="relative">
              <div className="absolute inset-0 -z-10 blur-3xl opacity-50 bg-gradient-to-tr from-cyan-300/40 via-sky-400/30 to-indigo-400/30"/>
              <Card className={`${K.glass} overflow-hidden`}>
                <CardContent className="p-0">
                  {/* 英雄区可替换为真实渲染/视频 */}
                  <div className="aspect-video w-full grid lg:grid-cols-3">
                    <div className="lg:col-span-2 p-6 flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-white/80"><Camera className="w-4 h-4"/>AR 第一视角</div>
                      <div className="mt-4 rounded-xl border border-white/10 bg-black/50 p-4">
                        <ResponsiveContainer width="100%" height={180}>
                          <ComposedChart data={waterData}>
                            <XAxis dataKey="t" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[24.8, 25.8]} />
                            <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[7.0, 8.6]} />
                            <RTooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '0.5rem' }}/>
                            <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={2} dot={false} name="温度" />
                            <Line yAxisId="right" type="monotone" dataKey="do" stroke="#818cf8" strokeWidth={2} dot={false} name="溶解氧"/>
                          </ComposedChart>
                        </ResponsiveContainer>
                        <div className="mt-2 text-white/70 text-xs text-center">实时水质：温度 / 溶解氧</div>
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-b from-white/5 to-white/0">
                      <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 mt-0.5 shrink-0"/>“仿生血液”电化学产氧，静音高效</li>
                        <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 shrink-0"/>AI 健康监测与异常预警</li>
                        <li className="flex items-start gap-2"><BatteryCharging className="w-4 h-4 mt-0.5 shrink-0"/>低电量自动返航无线充电</li>
                        <li className="flex items-start gap-2"><Hand className="w-4 h-4 mt-0.5 shrink-0"/>手势/APP 多模态交互</li>
                        <li className="flex items-start gap-2"><Satellite className="w-4 h-4 mt-0.5 shrink-0"/>数字孪生 & 元宇宙同步</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Section>

        {/* 功能矩阵 */}
        <Section id="features" className="py-12">
          <h2 className="text-2xl md:text-4xl font-bold">核心功能矩阵</h2>
          <p className="mt-2 text-white/80">将繁琐养护转化为沉浸互动与无人化运维。</p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Feature icon={Waves} title="游动即产氧">
              基于碘化锌液流电池的“仿生血液”，边游动边产氧，微气泡快速溶解，维持理想溶氧。
            </Feature>
            <Feature icon={Cpu} title="AI 生态管理">
              多传感融合 + 视觉识别，自动调控温度、pH、DO、浊度与光照，持续学习优化参数。
            </Feature>
            <Feature icon={Camera} title="AR 第一视角">
              鱼眼高清摄像头 + 电子云台，实现沉浸式水下漫游与远程陪伴。
            </Feature>
            <Feature icon={Workflow} title="自主巡航清洁">
              微型刷毛/吸附装置边巡航边清洁，悬浮颗粒带回基站处理。
            </Feature>
            <Feature icon={PlugZap} title="自动返航回充">
              低电量触发视觉/信标导航，精准对接≥15W 无线充电基站。
            </Feature>
            <Feature icon={Hand} title="多模态交互">
              APP 精细操控 + 手势跟随 + 场景联动（灯光/投喂），自然流畅。
            </Feature>
            <Feature icon={LineChart} title="智慧养护建议">
              长期数据学习，按鱼种与季节生成个性化策略与健康报告。
            </Feature>
            <Feature icon={ShieldCheck} title="安全巡逻预警">
              识别干烧/脱落/异常波动/异物，声光与 App 双通道告警。
            </Feature>
            <Feature icon={Boxes} title="缸内动态造景">
              3D 扫描 + 点云分析，识别藻类与覆盖率，生成造景建议。
            </Feature>
          </div>
        </Section>

        {/* 款式与工业设计 */}
        <Section id="models" className="py-12">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-2xl md:text-4xl font-bold">产品系列与款式</h2>
            <Tabs defaultValue="stardust" className={`${K.glass} rounded-2xl p-1`}>
              <TabsList>
                <TabsTrigger value="stardust">星辰系列</TabsTrigger>
                <TabsTrigger value="metascape">元境系列</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mt-6">
            <Card className={`${K.glass}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="w-4 h-4"/>星辰·驭水</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/90 text-sm">
                <p>裸露金属管线与动力结构，强调驾驭感与性能张力。</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>球形/圆角矩形舱体，高透超白玻璃</li>
                  <li>操控增强：急速冲刺与灵巧闪避</li>
                  <li>桌面深海探索舱美学</li>
                </ul>
                <Button variant="secondary" className="w-full">了解更多</Button>
              </CardContent>
            </Card>

            <Card className={`${K.glass}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Box className="w-4 h-4"/>星辰·潜望</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/90 text-sm">
                <p>完整球形视窗，沉浸式静谧观测体验，适合长时间观赏。</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>深海观测站语言，工业科技美学</li>
                  <li>超广域 360° 视野</li>
                  <li>适配客厅/办公室陈设</li>
                </ul>
                <Button variant="secondary" className="w-full">了解更多</Button>
              </CardContent>
            </Card>

            <Card className={`${K.glass}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Smartphone className="w-4 h-4"/>元境·蔚蓝</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/90 text-sm">
                <p>柔和赛博光效 + 磨砂舱体，与 VR/AR/元宇宙无缝联动。</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>数字资产化的“虚实共生鱼缸”</li>
                  <li>社交分享与远程陪伴</li>
                  <li>Z 世代潮玩定位</li>
                </ul>
                <Button variant="secondary" className="w-full">了解更多</Button>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* 交互控制台 */}
        <Section id="console" className="py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold">实时控制台 · Demo</h2>
              <p className="mt-2 text-white/80">模拟核心能力开关与水质监控。</p>
              <Card className={`${K.glass} mt-4`}>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between rounded-xl border border-white/10 p-3">
                      <div className="flex items-center gap-2 text-sm"><Camera className="w-4 h-4"/>AR/第一视角</div>
                      <Switch checked={ar} onCheckedChange={setAr}/>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 p-3">
                      <div className="flex items-center gap-2 text-sm"><FlameKindling className="w-4 h-4"/>自主清洁</div>
                      <Switch checked={autoClean} onCheckedChange={setAutoClean}/>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 p-3">
                      <div className="flex items-center gap-2 text-sm"><Presentation className="w-4 h-4"/>智能投喂</div>
                      <Switch checked={feed} onCheckedChange={setFeed}/>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 p-3">
                      <div className="flex items-center gap-2 text-sm"><Satellite className="w-4 h-4"/>元宇宙同步</div>
                      <Switch checked={metaverse} onCheckedChange={setMetaverse}/>
                    </div>
                  </div>

                  <Separator className="my-2"/>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>溶解氧</span>
                      <span className="text-white/80">8.3 mg/L</span>
                    </div>
                    <Progress value={83}/>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>温度</span>
                      <span className="text-white/80">25.4 ℃</span>
                    </div>
                    <Progress value={54}/>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>pH 值</span>
                      <span className="text-white/80">7.2</span>
                    </div>
                    <Progress value={72}/>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button variant="secondary">一键投饵</Button>
                <Button variant="secondary">补光/造景</Button>
                <Button variant="secondary">排水/换水</Button>
              </div>
            </div>

            <div className="lg:pl-6">
              <PhoneFrame>
                <div className="h-full w-full grid grid-rows-[auto_1fr_auto]">
                  <div className="p-3 flex items-center justify-between bg-white/5">
                    <span className="text-xs text-white/70">EcoMimic • Live</span>
                    <Badge className="rounded-full bg-green-500/80 text-white text-xs">在线</Badge>
                  </div>
                  <div className="relative bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/300x500/0a0a0a/334155?text=AR+View')"}}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,.25),transparent_60%)]"/>
                  </div>
                  <div className="p-3 grid grid-cols-3 gap-2 bg-white/5">
                    <Button variant="secondary" size="sm">拍照</Button>
                    <Button variant="secondary" size="sm">录像</Button>
                    <Button variant="secondary" size="sm">灯光</Button>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </Section>

        {/* 技术架构与部件 */}
        <Section className="py-12">
          <h2 className="text-2xl md:text-4xl font-bold">分布式 AI 架构</h2>
          <p className="mt-2 text-white/80">GD32H7（实时控制） + RK3588S（AI/应用） + ESP32‑S3（仿生鱼端）。</p>
          <div className="mt-6 grid lg:grid-cols-3 gap-4">
            <Feature icon={Cpu} title="RK3588S 应用与视觉引擎">
              8 核 CPU + 6 TOPS NPU，承担视觉识别/多模态推理/云端通讯与人机界面。
            </Feature>
            <Feature icon={Gauge} title="GD32H7 实时控制">
              可靠读取 pH/DO/ORP/TDS/浊度/液位/温度等传感并控制泵阀加热制冷等执行器。
            </Feature>
            <Feature icon={BatteryCharging} title="ESP32‑S3 仿生鱼端">
              低功耗通信 + 机体姿态/动力控制 + 返航定位与“仿生血液”产氧调度。
            </Feature>
          </div>
        </Section>

        {/* 规格参数 */}
        <Section id="specs" className="py-12">
          <h2 className="text-2xl md:text-4xl font-bold">关键规格</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-3 font-semibold">类别</th>
                  <th className="p-3 font-semibold">参数</th>
                  <th className="p-3 font-semibold">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-white/5">
                {[
                    {cat: "水族箱", param: "150×60×60 cm / ~540 L", desc: "超白玻璃 / 亚克力，360° 广域视野"},
                    {cat: "仿生鱼", param: "长度 30 cm / 5 段关节", desc: "亚鲹式推进，~1.0 BL/s"},
                    {cat: "AI 核心", param: "RK3588S • NPU 6 TOPS", desc: "视觉/行为/健康识别"},
                    {cat: "实时控制", param: "GD32H7 MCU", desc: "多传感融合与闭环调节"},
                    {cat: "通信", param: "Wi‑Fi 6 / BLE / 以太网", desc: "云端/APP/本地 HMI"},
                    {cat: "供氧", param: "“仿生血液”电化学", desc: "碘化锌液流 + 微气泡扩散"},
                    {cat: "回充", param: "≥15W 无线充电", desc: "自动返航/对位充电"},
                    {cat: "HMI", param: "7\" IPS 触控屏", desc: "参数/预警/一键维护"},
                ].map(row => (
                    <tr key={row.cat}>
                        <td className="p-3 font-medium">{row.cat}</td>
                        <td className="p-3 text-white/90">{row.param}</td>
                        <td className="p-3 text-white/70">{row.desc}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 版本时间线 */}
        <Section className="py-12">
          <h2 className="text-2xl md:text-4xl font-bold">从 1.0 到 3.0 的进化</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Card className={`${K.glass}`}>
              <CardHeader><CardTitle>V1.0 机械仿生</CardTitle></CardHeader>
              <CardContent className="text-sm text-white/90 space-y-2">
                <p>多关节尾鳍，摆尾姿态接近真实；续航与噪声仍有短板。</p>
                <Badge variant="secondary">原型探索</Badge>
              </CardContent>
            </Card>
            <Card className={`${K.glass}`}>
              <CardHeader><CardTitle>V2.0 视感觉醒</CardTitle></CardHeader>
              <CardContent className="text-sm text-white/90 space-y-2">
                <p>机器视觉 + 手势跟随；水质传感接入；首代磁吸充电桩。</p>
                <Badge variant="secondary">感知-预警</Badge>
              </CardContent>
            </Card>
            <Card className={`${K.glass}`}>
              <CardHeader><CardTitle>V3.0 生态共生</CardTitle></CardHeader>
              <CardContent className="text-sm text-white/90 space-y-2">
                <p>“游动即产氧” + 自主运维闭环 + AR/元宇宙沉浸交互。</p>
                <Badge variant="secondary">无人化运维</Badge>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* CTA 表单 */}
        <Section className="py-12">
          <div className={`${K.glass} rounded-3xl p-6 md:p-10 grid lg:grid-cols-2 gap-8 items-center`}>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">预约线下演示 / 获取报价</h3>
              <p className="mt-2 text-white/80">提交信息，我们将在 1 个工作日内联系您，提供场景化方案建议与试用名额。</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/>企业/高校/商业空间定制支持</li>
                <li className="flex items-center gap-2"><Cloud className="w-4 h-4"/>开放 API 与数字孪生接口</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4"/>原型机交付周期可议</li>
              </ul>
            </div>
            <form className="space-y-3">
              <div>
                <Label htmlFor="name">联系人</Label>
                <Input id="name" placeholder="您的姓名"/>
              </div>
              <div>
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" type="email" placeholder="name@example.com"/>
              </div>
              <div>
                <Label>应用场景</Label>
                <div className="grid grid-cols-2 gap-2 text-sm mt-1">
                  {[
                    "家庭高端观赏", "商业空间装置", "科普/教育",
                    "科研平台", "数字疗愈", "其他"
                  ].map(x => (
                    <label key={x} className="flex items-center gap-2 rounded-xl border border-white/10 p-2 cursor-pointer hover:bg-white/10">
                      <Checkbox id={`scene-${x}`}/> <span>{x}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="notes">备注</Label>
                <Input id="notes" placeholder="期望功能/交付时间/预算范围等"/>
              </div>
              <Button className="w-full rounded-xl">提交</Button>
            </form>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" className="py-12">
          <h2 className="text-2xl md:text-4xl font-bold">常见问题</h2>
          <Accordion type="single" collapsible className="mt-6 w-full max-w-3xl mx-auto">
            <AccordionItem value="q1">
                <AccordionTrigger>“仿生血液”产氧是否需要额外维护？</AccordionTrigger>
                <AccordionContent>
                  日常仅需在系统提示时补充电解液并进行安全检查；AI 将按溶氧传感反馈自动调节产氧速率。
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
                <AccordionTrigger>停电或断网时系统如何工作？</AccordionTrigger>
                <AccordionContent>
                    本地 MCU 维持基础生命线（温度/供氧/水位）闭环；联网恢复后自动同步到云端与 App。
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
                <AccordionTrigger>是否支持第三方开发？</AccordionTrigger>
                <AccordionContent>
                    提供开放 API、WebSocket 实时流与数字孪生接口，便于科研与创客扩展。
                </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        {/* 页脚 */}
        <footer className="border-t border-white/10 mt-12">
          <Section className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Fish className="w-4 h-4"/>
              <span className="text-sm">© {new Date().getFullYear()} EcoMimic Labs</span>
            </div>
            <div className="text-xs text-white/70">本页面为演示站点：包含交互原型、数据示例与占位视觉。</div>
          </Section>
        </footer>
      </main>
    </TooltipProvider>
  );
}
